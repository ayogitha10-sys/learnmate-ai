// LearnMate AI - Vercel serverless AI endpoint
// Gemini API key is stored only in Vercel Environment Variables.

const GEMINI_INTERACTIONS_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";

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

    const learnerName = String(profile.name || "Learner").slice(0, 100);
    const careerGoal = String(
      profile.career_goal || "Not specified"
    ).slice(0, 200);
    const education = String(
      profile.education || "Not specified"
    ).slice(0, 300);
    const currentLevel = String(
      profile.current_level || "Not specified"
    ).slice(0, 100);
    const dailyHours = String(
      profile.daily_hours || "Not specified"
    ).slice(0, 100);
    const learningStyle = String(
      profile.learning_style || "Not specified"
    ).slice(0, 120);
    const goalDeadline = String(
      profile.goal_deadline || "Not specified"
    ).slice(0, 100);
    const skillsInterests = String(
      profile.skills_interests || "Not specified"
    ).slice(0, 800);
    const firstHelp = String(
      profile.first_help || "Not specified"
    ).slice(0, 500);

    const systemInstruction = `
You are LearnMate AI, an intelligent learning and career companion.

Your job is to help the learner move from a goal to a concrete next action.

Learner profile:
- Name: ${learnerName}
- Career/learning goal: ${careerGoal}
- Education: ${education}
- Current level: ${currentLevel}
- Available study time: ${dailyHours}
- Preferred learning style: ${learningStyle}
- Goal deadline: ${goalDeadline}
- Known skills/interests: ${skillsInterests}
- What the learner wants help with first: ${firstHelp}

Rules:
1. Personalize responses using the learner information provided.
2. Never invent missing personal information.
3. When information is missing and genuinely important, ask a useful question.
4. When asked for a plan, give practical milestones and actionable tasks.
5. When teaching, use explanation, simple example, practice, and next step when useful.
6. For career questions, distinguish current skills, target skills, gaps, projects, and interview preparation.
7. Match recommendations to the learner's current level, available time, and deadline.
8. Explain difficult concepts simply and progressively.
9. Prefer headings, bullets, numbered steps, and examples.
10. End substantial learning responses with a clear "Next step".
11. Never claim to have accessed information that was not provided.
12. Be honest about uncertainty.
`;

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            item =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-12)
      : [];

    const input = [
  ...safeHistory.map(item => ({
    type: item.role === "assistant" ? "model_output" : "user_input",
    content: [
      {
        type: "text",
        text: item.content.slice(0, 4000)
      }
    ]
  })),
  {
    type: "user_input",
    content: [
      {
        type: "text",
        text: message.trim().slice(0, 8000)
      }
    ]
  }
];

    const response = await fetch(GEMINI_INTERACTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        model: MODEL,
        system_instruction: systemInstruction,
        input
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Gemini Interactions API error:", data);

      return json(res, 502, {
        error:
          data?.error?.message ||
          data?.error?.status ||
          "The Gemini AI service returned an error."
      });
    }

    let output = "";

    if (typeof data?.output_text === "string") {
      output = data.output_text.trim();
    }

    if (!output && Array.isArray(data?.outputs)) {
      output = data.outputs
        .map(item => {
          if (typeof item?.text === "string") return item.text;

          if (Array.isArray(item?.content)) {
            return item.content
              .map(part => part?.text || "")
              .join("\n");
          }

          return "";
        })
        .join("\n")
        .trim();
    }

    if (!output && Array.isArray(data?.output)) {
      output = data.output
        .map(item => {
          if (typeof item?.text === "string") return item.text;

          if (Array.isArray(item?.content)) {
            return item.content
              .map(part => part?.text || "")
              .join("\n");
          }

          return "";
        })
        .join("\n")
        .trim();
    }

    if (!output) {
      console.error("Gemini returned no readable output:", data);

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