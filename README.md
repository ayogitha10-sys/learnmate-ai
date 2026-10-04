# LearnMate AI — MVP

A polished, responsive front-end MVP for the LearnMate AI project described in the project report: an intelligent learning and career guidance assistant with chatbot, RAG, specialized agents, planning, interview preparation, project guidance, resume support and personalization.

## Run locally

No build tools are required.

1. Open `index.html` in a browser, or serve the folder with any static server.
2. The app stores demo profile, conversation and task data in browser `localStorage`.

## Included pages

- Landing page / try-first experience
- Dashboard
- Adaptive AI Assistant
- Learn
- Documents / RAG-ready UX
- Interview Studio
- AI Planner
- Projects
- Career roadmap + skill gap
- Resume Studio
- Progress / achievements
- Settings

## Next production steps

1. Add Supabase authentication + PostgreSQL.
2. Move user/profile/progress/task/document data from localStorage to Supabase.
3. Add secure file storage and document processing.
4. Add embeddings + vector search for RAG.
5. Connect an LLM API behind a server-side API route.
6. Implement the agent router and specialized agents.
7. Deploy the static/front-end layer to Vercel and backend/AI services separately.
