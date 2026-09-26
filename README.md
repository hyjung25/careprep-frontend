# CarePrep frontend

A responsive English/Korean chat interface that helps users describe symptoms, explore a small set of authoritative general health resources, and prepare visit notes. Educational class prototype; **not a diagnostic service or validated triage tool**.

**Frontend preview:** https://hyjung25.github.io/careprep-frontend/

**Status:** frontend published; Render deployment and live OpenAI configuration are pending.

Plain HTML, CSS and JavaScript; no build system, dependencies, API keys, analytics, or database. Its separate [FastAPI backend](https://github.com/hyjung25/careprep-backend) runs on Render and calls OpenAI. A working AI-backed deployment requires the backend URL and a server-side API key; the frontend does not simulate live AI.

## Local run

```sh
python3 -m http.server 5500 --bind 127.0.0.1
```

Open `http://127.0.0.1:5500`. Start the backend on port 8000 using its README. Local `config.js` defaults to `http://127.0.0.1:8000`. Use HTTP serving instead of opening `index.html` directly (file origins/clipboard behavior differ).

## Backend configuration

Edit the **production** URL in `config.js` from `''` to the actual HTTPS Render URL. Never guess its assigned hostname or put API keys in this file. The backend must allow `https://hyjung25.github.io` plus your local development origin in `ALLOWED_ORIGINS`.

For temporary testing, open **Connection settings**, enter a trusted backend URL, and click **Apply & check**. This calls `/health`. Setting a different endpoint clears the current conversation to prevent forwarding it to another server. This URL is kept only in memory and resets on refresh. Production uses HTTPS; only localhost is permitted over HTTP. The health check reports whether a key is configured, not whether it works.

When the production URL is empty, the site shows an honest connection-setup error and sends no health text. There is no silent mock fallback.

## Features and API communication

- **Send message** → `POST /api/chat` with `{message, history, language}`. Returned `response`, `urgent`, and structured `sources` are shown as text/verified HTTPS source links.
- **Generate visit summary** → `POST /api/summary` with `{history, language}`. The backend returns user-message quotes grouped by concern, timing, severity/progression, associated symptoms, volunteered medications/allergies, and clinician questions; empty categories are unknowns.
- **Copy summary** uses the browser clipboard. If permission is blocked, select/copy the visible text manually.
- **Clear conversation** empties messages, draft, sources, and notes; aborts an in-flight request; ignores late results.
- Language changes interface text and future replies. Existing messages/quotes keep their original wording and language.
- The client blocks duplicate submissions; Ctrl/Cmd+Enter also sends. Enter alone inserts a newline (including Korean IME composition).
- Errors distinguish missing credentials, invalid input, provider failure/timeout, rate limits, and connection failure. Failed drafts remain available. Requests time out after 45 seconds.
- Up to 12 recent messages retained in tab memory/DOM; each sent content is at most 1200 characters. Notes cover only this bounded context. Earlier details must be re-entered if needed. No localStorage, sessionStorage, service worker, or database is used.

User and assistant text uses `textContent`, never unsanitized HTML/Markdown. Only backend source metadata for `https://medlineplus.gov` becomes clickable. Source links have `noopener noreferrer`. No external fonts or scripts are loaded.

## GitHub Pages

1. Keep this code in its own public Git repository named `careprep-frontend` with branch `main`.
2. Push to GitHub. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**.
3. Save and wait for the Pages build. `.nojekyll` keeps this a plain static site. Source and documentation files are public, as they already are in the public repository.
4. After success, use the URL reported by GitHub Pages. Check it in a browser.
5. Deploy the backend separately, update `config.js` with its actual URL, and push again. Verify chat, summary, sources, and error handling on the public site using synthetic examples.

The optional `deployment/pages.example.yml` can be moved to `.github/workflows/pages.yml` if you later use a token with workflow permission and switch Pages to GitHub Actions. It uploads only five public assets. Initial publishing uses the existing token’s permissions and branch-based Pages.

For a different GitHub username/domain, update backend CORS and documentation links. Relative frontend assets work under the `/careprep-frontend/` repository path.

## Privacy and limits

The notice appears before the first message. Text is sent to the configured backend and OpenAI; avoid identifying information. The backend asks the provider not to store Responses application state, but provider abuse monitoring/retention and hosting policies still apply. See the backend README and [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data). Clearing the tab cannot remove already processed provider requests or clipboard data.

Resource coverage is intentionally small: headache, cough, abdominal pain, and selected chest/breathing safety references. Korean passages are project translations. Keyword retrieval, model selection, and example urgency matching can fail. Neither the output nor the tests constitute clinical validation. No wound photos, file uploads, diagnosis, or medication dosing/changes are supported. When immediate danger is possible, contact local emergency services without waiting for a chat response.

## Browser software checks

`test_browser.py` uses synthetic examples against both the real local backend (missing credentials) and the **explicitly labeled** backend `tests.fixture_server` (simulated provider selections). It is not a live AI test.

With both repos adjacent, production backend on `:8000`, fixture backend on `:8001`, and frontend on `:5500`:

```sh
../careprep-backend/.venv/bin/pip install playwright==1.63.0
# Install Google Chrome if not already available, or adapt launch(channel='chrome').
../careprep-backend/.venv/bin/python test_browser.py
```

Checks include actual HTTP/CORS, chat/follow-up/sources/summary, copy, Korean UI, urgency, safe text rendering, mobile overflow, missing key, provider errors/rate limits/timeouts, frontend timeout, draft retention, abort/clear, and refresh clearing. Screenshots are written to ignored `test-results/`.

Assignment materials: [demo script](DEMO.md), [submission checklist](SUBMISSION.md), [actual prompt log](prompt_log.md).
