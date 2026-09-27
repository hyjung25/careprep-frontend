# Verification record — 2026-09-26

## Executed software checks

- Backend: `python -m pytest -q` — **40 passed**, Python 3.12. One third-party deprecation warning (`anyio.abc.BlockingPortal`) does not affect results.
- Local Chrome browser: `python test_browser.py` — **passed** against static frontend `:5500`, production FastAPI `:8000`, and explicitly labeled provider fixture `:8001`.
- Real HTTP/CORS between different local ports; missing-key production error; fixture-driven successful chat, follow-up, citation links, quoted summary and clipboard equality.
- Invalid/blank/oversized input; provider error/timeout/refusal and rate limit handling; unknown citation and summary indices rejected; diagnosis/dosing boundary messages; urgent English/Korean messages and instruction-override examples.
- UI: safe literal HTML rendering, duplicate prevention while pending, clear/abort with late-response suppression, summary invalidation on new turn, preservation of failed draft, memory-only state and refresh clearing.
- A real 45-second browser timeout was exercised with an intercepted hanging HTTP request. The initial run showed a shutdown warning for that intentionally hanging route. Cleanup was corrected; the final full browser run passed without the warning.
- Desktop and 390px mobile screenshots inspected; no horizontal overflow in mobile Korean UI. Screenshots are local ignored test artifacts.

## What these checks do not establish

These are synthetic **software checks, not clinical validation**. There was no OpenAI API key available, so successful AI selections used injected test responses. The real HTTP adapter was exercised through a mocked OpenAI transport to inspect URL, JSON schema, `store:false`, limits, failure handling and response parsing. This does not prove live model availability, adherence, urgency detection, translation quality, source relevance or medical correctness.

No Render token/integration/account access is available in this session. Backend deployment and live provider smoke tests remain required. GitHub Pages can host the real frontend independently, but an unconfigured backend is clearly reported in the UI.

## Release status

- Public backend repository: https://github.com/hyjung25/careprep-backend (separate root commit/history).
- Public frontend repository: https://github.com/hyjung25/careprep-frontend (separate root commit/history).
- Frontend deployed with branch-based GitHub Pages: https://hyjung25.github.io/careprep-frontend/ — GitHub build reported `built`; HTTP 200 verified on 2026-09-26.
- Public Chrome smoke test passed: HTTP 200, rendered frontend assets, honest unconfigured-backend error, preserved draft, Korean setup notice, and the live portfolio project link.
- The existing token lacks workflow scope; templates are provided without expanding credentials. Branch-based Pages succeeded.
- Render backend URL: **not deployed / unavailable**. No Render credentials or integration and no OpenAI API key were available. Deploy `render.yaml`, set the backend key and CORS, update `config.js`, then test live.
- Portfolio update published: https://hyjung25.github.io/#careprep — verified Pages build `built` for commit `4562d1e`. An isolated checkout was used; the existing dirty local portfolio checkout is untouched.

A frontend deployment does not establish that the live AI backend is operating.

## Follow-up verification (2026-09-27)

The initial credential gap described above was resolved **locally**. After fixing folder-move process paths, live browser chat and summary checks succeeded. Render deployment remains pending.

The summary design now uses concise notes with cited user evidence and a second model grounding review; the earlier whole-message format is superseded. **45 backend tests passed**, including invalid evidence and rejected negation-loss checks. Live synthetic English and Korean summaries retained context without inferring causation and left generic chatbot questions out of clinician questions. User review is still necessary.
