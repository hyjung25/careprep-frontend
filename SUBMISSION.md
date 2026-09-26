# Submission checklist

Fill these with verified real links. Deployment status is recorded in `VERIFICATION.md`.

- [ ] Frontend URL: copy the successful GitHub Pages deployment URL.
- [ ] Backend URL: **pending Render deployment**; copy it from Render, then verify `/health` and provider-backed chat/summary.
- [ ] Frontend repository: https://github.com/hyjung25/careprep-frontend
- [ ] Backend repository: https://github.com/hyjung25/careprep-backend
- [ ] Portfolio: https://hyjung25.github.io/ — verify the CarePrep project link after publishing.
- [ ] Demo video: record 60–90 seconds using `DEMO.md`; add the actual shareable video URL.
- [ ] Google Form: use the assignment's form URL (not supplied in this request), paste required links, and submit it yourself.
- [ ] Confirm both repositories are public and their Git histories remain separate.
- [ ] Set `OPENAI_API_KEY` only in Render, check compatible `OPENAI_MODEL`, CORS origin, rate/spend limits.
- [ ] Update production URL in `config.js` and push the frontend. Verify the public origin, not just localhost.
- [ ] Run a live synthetic English/Korean chat, follow-up, citation, summary, and boundary/error smoke test. Never record a key or identifying health information.
- [ ] Explain the small RAG pipeline and its limits; don't call the project medically validated.
- [ ] Include/read `prompt_log.md` in both repositories.

## Portfolio description

**CarePrep — AI-assisted healthcare visit preparation.** An English/Korean conversational class prototype built with HTML/CSS/JavaScript and FastAPI. It retrieves curated MedlinePlus passages, validates citations, asks follow-up questions, and groups user-reported messages into copyable visit notes. Privacy-conscious bounded context and backend response constraints keep the project focused on education and appointment preparation. It is not a diagnostic or validated triage service.

Until Render/API setup is complete, label the app link **“Frontend preview — AI backend setup pending.”**
