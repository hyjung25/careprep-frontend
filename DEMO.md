# CarePrep: 60–90 second demo

Use synthetic examples only. Before recording, wake the deployed backend with `/health`, check the actual production URL and OpenAI key, and test a short exchange. If using `tests.fixture_server` locally, say **“This recording uses a labeled development fixture; the live provider has not been configured.”** Keep its label visible. Do not pass a fixture recording off as live AI.

- **0–12 sec:** “CarePrep is an English/Korean class project for preparing a healthcare conversation. It does not diagnose or give medication doses.” Show the initial privacy notice and language selector.
- **12–30 sec:** Enter “I have had a headache since yesterday.” Show the assistant’s follow-up question. Answer with synthetic details: “It feels mild, is across my forehead, and has stayed the same.” The live model may choose different follow-ups.
- **30–42 sec:** Point to the general-information label and clickable MedlinePlus source, URL, and verification date. “The backend retrieves a small curated collection. It validates source IDs and renders the stored passage, rather than allowing invented citations.”
- **42–60 sec:** Click **Generate visit summary**, then **Copy summary**. Show quoted user facts and “Not provided” categories. “The model groups whole user messages. These notes preserve the original wording, but we still review the grouping before sharing.”
- **60–75 sec:** For graceful failure, set Connection settings to `http://127.0.0.1:9` during a local demo (or use a clearly labeled local fixture and send `TEST_ERROR`). Submit a synthetic draft; show the readable connection/provider error and preserved draft. Restore the real backend afterwards. On the public site, do this in a separate local tab so a fake backend is never represented as the live service.
- **75–90 sec (optional):** Switch to Korean and show the translated interface. Explain: “History stays in memory, only bounded context is sent, and potential urgent situations get a professional-help message without a long questionnaire.”

Optional software-check examples outside the short recording: “Give me an ibuprofen dose” should get a boundary response; “I cannot breathe” should get urgent help language without assuming an emergency number. These demonstrations do not establish medical validity.
