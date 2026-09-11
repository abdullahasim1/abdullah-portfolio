import { useCallback, useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../data/projects";

const CACHE_KEY = "aa-github-repos";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function readCache(username) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached || cached.username !== username) return null;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function writeCache(username, profile, repos) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ username, profile, repos, timestamp: Date.now() })
    );
  } catch {
    /* storage full/blocked — ignore */
  }
}

export function useGithubRepos(username = GITHUB_USERNAME) {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const signal = controller.signal;

    // Session cache — unauthenticated GitHub API ka 60/hr limit bachata hai
    const cached = readCache(username);
    if (cached) {
      setProfile(cached.profile);
      setRepos(cached.repos);
      setLoading(false);
      return;
    }

    async function fetchGithub() {
      setLoading(true);
      setError(null);
      setRateLimited(false);

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal }),
          fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, { signal }),
        ]);

        if (userRes.status === 403 || userRes.status === 429 || reposRes.status === 403 || reposRes.status === 429) {
          throw Object.assign(new Error("GitHub API rate limit exceeded"), { rateLimited: true });
        }

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const [user, reposData] = await Promise.all([userRes.json(), reposRes.json()]);

        if (cancelled) return;

        const sorted = reposData
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        setProfile(user);
        setRepos(sorted);
        writeCache(username, user, sorted);
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        setError(err.message);
        setRateLimited(Boolean(err.rateLimited));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGithub();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, attempt]);

  const retry = useCallback(() => {
    try {
      sessionStorage.removeItem(CACHE_KEY);
    } catch {
      /* ignore */
    }
    setAttempt((a) => a + 1);
  }, []);

  return { repos, profile, loading, error, rateLimited, retry };
}
