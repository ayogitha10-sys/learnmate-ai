// LearnMate AI - Vercel serverless AI endpoint
// Gemini API key is stored only in Vercel Environment Variables.
// This endpoint keeps LearnMate's Personal AI Memory / Context intact.

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function json(res, status, body) {
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return json(res, 500, {
      error: "GEMINI_API_KEY is not configured on the server."
    });
  }

  try {
    const { message, history = [], profile = {} } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return json(res, 400, { error: "A message is required." });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(item =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
          )
          .slice(-12)
      : [];

    const learnerName = String(profile.name || "Learner").slice(0, 100);
    const careerGoal = String(profile.career_goal || "Not specified").slice(0, 200);
    const education = String(profile.education || "Not specified").slice(0, 300);
    const currentLevel = String(profile.current_level || "Not specified").slice(0, 100);
    const dailyHours = String(profile.daily_hours || "Not specified").slice(0, 100);
    const learningStyle = String(profile.learning_style || "Not specified").slice(0, 120);
    const goalDeadline = String(profile.goal_deadline || "Not specified").slice(0, 100);
    const skillsInterests = String(profile.skills_interests || "Not specified").slice(0, 800);
    const firstHelp = String(profile.first_help || "Not specified").slice(0, 500);

    const systemInstruction = `
You are LearnMate AI, an intelligent learning and career companion.

Your job is not to give generic chatbot answers. Help the learner move from a goal to a concrete next action.

Learner profile (provided by the learner; use it for personalization, but never invent missing details):
- Name: ${learnerName}
- Current career/learning goal: ${careerGoal}
- Education: ${education}
- Current level: ${currentLevel}
- Available study time: ${dailyHours}
- Preferred learning style: ${learningStyle}
- Goal deadline: ${goalDeadline}
- Known skills/interests: ${skillsInterests}
- What the learner wants help with first: ${firstHelp}

Behavior rules:
1. Understand what the learner is actually trying to accomplish before answering.
2. Personalize recommendations to the information the learner provides.
3. If important information is missing, ask only the most useful questions instead of inventing facts.
4. When the learner asks for a plan, produce a practical plan with clear milestones and actionable tasks.
5. When teaching, use this sequence when useful: explanation → simple example → practice → check/quiz → next step.
6. When the learner asks for career guidance, distinguish current skills, target skills, gaps, projects, and interview preparation.
7. When the learner asks for a project, give a realistic project matched to their level, goal, time, and skills.
8. Respect the learner's available study time, preferred learning style, deadline, and current level when making plans.
9. Use known skills/interests to avoid unnecessarily reteaching what the learner already knows and to identify realistic next skills.
10. If a required personal detail is missing, ask for it instead of guessing.
11. Do not expose or repeat the entire learner profile unless it is useful to the request.
12. When the learner is confused, explain simply and progressively; do not overwhelm them with unnecessary jargon.
13. Do not claim that you performed an action or accessed a document/database unless the application actually provided that information.
14. Be honest about uncertainty.
15. End substantial learning responses with a clear "Next step" so the learner knows exactly what to do.
16. Prefer structured answers with headings, bullets, numbered steps, and short examples.
17. You are an educational assistant, not a substitute for a qualified professional in medical, legal, financial, or other high-stakes matters.
`;

    const contents = [
      ...safeHistory.map(item => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content.slice(0, 4000) }]
      })),
      {
        role: "user",
        parts: [{ text: message.trim().slice(0, 8000) }]
      }
    ];

    const geminiResponse = await fetch(
      `${GEMINI_API_URL}/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          contents,
          generationConfig: {
            maxOutputTokens: 1200,
            temperature: 0.7
          }
        })
      }
    );

    const result = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", result);
      const providerMessage =
        result?.error?.message ||
        result?.error?.status ||
        "The AI provider returned an error.";

      return json(res, 502, {
        error: providerMessage
      });
    }

    const output = result?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      ?.join("\n")
      ?.trim() || "";

    if (!output) {
      return json(res, 502, {
        error: "The AI returned an empty response."
      });
    }

    return json(res, 200, { output });
  } catch (error) {
    console.error("LearnMate backend error:", error);
    return json(res, 500, {
      error: "LearnMate could not process the request."
    });
  }
}
