# LearnMate AI — Ready-to-submit functional MVP

A no-build LearnMate AI front-end with Supabase authentication plus a fully functional browser-side learning/product layer.

## Run

1. Keep all files in this folder together.
2. Open `index.html` directly, or serve the folder with a static server.
3. For the existing `/api/chat` AI route, deploy the folder to a platform that supports the included `api/chat.js` endpoint (for example Vercel). The app also has a local fallback assistant, so the core UI remains usable without the API.

## Functional fixes included

- Logout is visible in the sidebar and Settings and signs out of Supabase when a session exists.
- Add Goal is a proper styled LearnMate modal; no browser `prompt()` is used.
- Planner goals are saved locally and feed Dashboard + Progress.
- Interview Studio has real HR, Technical and Project question flows, answer submission, scoring and results.
- Career → Improve my roadmap generates visible skill-gap actions from the user's goal and activity.
- Dashboard, Career and Progress metrics are calculated from stored user activity instead of hard-coded demo numbers.
- Projects have real saved workspaces with planned/building/ready/completed states, task checklists and submission.
- Documents can be uploaded and text-readable content is stored as AI context. Ask LearnMate opens the AI assistant with the selected document active.
- TXT extraction works natively; PDF and DOCX extraction use optional CDN browser parsers with graceful fallback.
- Learning paths can be created and modules completed, which updates real progress.

## Data model

The MVP keeps activity in browser localStorage keys such as:

- `lm_user`
- `lm_tasks`
- `lm_learning_paths`
- `lm_projects`
- `lm_interviews`
- `lm_documents`
- `lm_activity`
- `lm_chats`

Supabase remains responsible for the existing authentication/profile bridge.
