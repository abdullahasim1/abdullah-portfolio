// Markdown for Agents — Accept: text/markdown par homepage ka markdown version.
// Browsers (Accept: text/html) ko asli HTML hi milta hai.
export const config = {
  matcher: "/",
};

export default async function middleware(request) {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/markdown")) return;

  const mdUrl = new URL("/index.md", request.url);
  const res = await fetch(mdUrl);
  const body = await res.text();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
