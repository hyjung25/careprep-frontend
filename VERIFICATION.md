# Verification record — 2026-09-26

## Executed software checks

- Backend: `python -m pytest -q` — **40 passed**, Python 3.12. One third-party deprecation warning (`anyio.abc.BlockingPortal`) does not affect results.
- Local Chrome browser: `python test_browser.py` — **passed** against static frontend `:5500`, production FastAPI `:8000`, and explicitly labeled provider fixture `:8001`.
- Real HTTP/CORS between different local ports; missing-key production error; fixture-driven successful chat, follow-up, citation links, quoted summary and clipboard equality.
- Invalid/blank/oversized input; provider error/timeout/refusal and rate limit handling; unknown citation and summary indices rejected; diagnosis/dosing boundary messages; urgent English/Korean messages and instruction-override examples.
- UI: safe literal HTML rendering, duplicate prevention while pending, clear/abort with late-response suppression, summary invalidation on new turn, preservation of failed draft, memory-only state and refresh clearing.
- A real 45-second browser timeout was exercised with an intercepted hanging HTTP request. A test-runner cancellation warning appeared during shutdown of that intentionally hanging route; all assertions passed.
- Desktop and 390px mobile screenshots inspected; no horizontal overflow in mobile Korean UI. Screenshots are local ignored test artifacts.

## What these checks do not establish

These are synthetic **software checks, not clinical validation**. There was no OpenAI API key available, so successful AI selections used injected test responses. The real HTTP adapter was exercised through a mocked OpenAI transport to inspect URL, JSON schema, `store:false`, limits, failure handling and response parsing. This does not prove live model availability, adherence, urgency detection, translation quality, source relevance or medical correctness.

No Render token/integration/account access is available in this session. Backend deployment and live provider smoke tests remain required. GitHub Pages can host the real frontend independently, but an unconfigured backend is clearly reported in the UI.

## Release status

- Public backend repository: https://github.com/hyjung25/careprep-backend (separate root commit/history).
- Public frontend repository: https://github.com/hyjung25/careprep-frontend (separate root commit/history).
- Frontend deployed with branch-based GitHub Pages: https://hyjung25.github.io/careprep-frontend/ — GitHub build reported `built`; HTTP 200 verified on 2026-09-26.
- The existing token lacks workflow scope; templates are provided without expanding credentials. Branch-based Pages succeeded.
- Render backend URL: **not deployed / unavailable**. No Render credentials or integration and no OpenAI API key were available. Deploy `render.yaml`, set the backend key and CORS, update `config.js`, then test live.
- Portfolio update uses an isolated checkout of `hyjung25/hyjung25.github.io`; the existing dirty local portfolio checkout is untouched.

A frontend deployment does not establish that the live AI backend is operating.
