# Contact Form — Web3Forms setup

The contact form (`src/pages/Contact.jsx`) sends submissions through
[Web3Forms](https://web3forms.com) when an access key is configured, and
falls back to a `mailto:` link when it is not.

## Configuration (set 2026-11-15)

- **Env var:** `VITE_WEB3FORMS_ACCESS_KEY` — set in the Vercel project
  (Production + Preview). Vite inlines it at build time, so changing it
  requires a new deployment to take effect. The key is a public embed key
  by design (it ships in the client bundle); it is not stored in this repo.
- **Web3Forms form:** "Portfolio Contact Form", website
  `https://abdullah-asim-dev.vercel.app`, on the free plan
  (250 submissions/month). The Web3Forms account sign-in email is
  createfbid350@gmail.com.
- **Recipient:** submissions are delivered to **abdullah.gc.18@gmail.com**
  (the form's sole recipient — the free plan allows one; the address was
  verified through Web3Forms' linked-email flow on 2026-11-15).

## If mail stops arriving

1. Check the Web3Forms dashboard → the form → Submissions (submissions are
   stored there even if an email is missed).
2. Confirm `VITE_WEB3FORMS_ACCESS_KEY` still exists in Vercel → Project →
   Settings → Environment Variables, then redeploy.
3. Confirm the recipient under the form's Settings → Email Configuration.
