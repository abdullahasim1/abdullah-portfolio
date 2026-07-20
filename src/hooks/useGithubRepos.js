import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../data/projects";

export function useGithubRepos(username = GITHUB_USERNAME) {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const [user, reposData] = await Promise.all([userRes.json(), reposRes.json()]);

        if (cancelled) return;

        setProfile(user);
        setRepos(
          reposData
            .filter((repo) => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        );
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGithub();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, profile, loading, error };
}
