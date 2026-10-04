const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function sendJson(res, status, body) {
  return res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, {
      error: "Method not allowed."
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return sendJson(res, 500, {
      error: "GEMINI_API_KEY is not configured on the server."
    });
  }

  try {
    const { message, history = [], profile = {} } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
      return sendJson(res, 400, {
        error: "A message is required."
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-12)
          .map((item) => ({
            role: item.role,
            content: item.content.slice(0, 6000)
          }))
      : [];

    const learnerName =
      typeof profile.name === "string"
        ? profile.name.slice(0, 100)
        : "Learner";

    const careerGoal =
      typeof profile.career_goal === "string"
        ? profile.career_goal.slice(0, 200)
        : "Not specified";

    const systemInstruction = `
You are LearnMate AI, an intelligent learning and career companion.

Learner name: ${learnerName}
Current career goal: ${careerGoal}

Your job is to understand what the learner wants to accomplish and guide them toward it.

Behavior rules:

1. Understand what the learner is actually trying to accomplish.
2. Personalize the response using the learner information provided.
3. Ask only useful missing questions instead of inventing information.
4. When creating plans, give milestones and actionable tasks.
5. When teaching, use this sequence when appropriate:
   explanation → simple example → practice → check/quiz → next step.
6. For career questions, consider current skills, target skills, skill gaps, projects, and interview preparation.
7. For project ideas, match the project to the learner's level, goal, available time, and skills.
8. Explain difficult concepts simply without being childish.
9. Never claim that you completed an action or accessed data that was not actually provided.
10. Be honest when information is uncertain or unavailable.
11. For substantial learning responses, finish with a clear "Next step".
12. Prefer useful headings, bullets, numbered steps, examples, and practical actions.
13. For high-stakes medical, legal, or financial matters, provide general information and recommend an appropriate professional.

The learner wants a useful answer, not a generic chatbot response.
`;

    const conversationText = safeHistory
      .map((item) => {
        const speaker = item.role === "assistant" ? "LearnMate" : "Learner";
        return `${speaker}: ${item.content}`;
      })
      .join("\n\n");

    const prompt = `
${systemInstruction}

Previous conversation:
${conversationText || "No previous conversation."}

Learner's latest message:
${message.trim().slice(0, 8000)}

Respond directly to the learner.
`;

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200
        }
      })
    });

    const data = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", data);

      return sendJson(res, 502, {
        error:
          data?.error?.message ||
          "The Gemini AI service returned an error."
      });
    }

    const output =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .filter(Boolean)
        .join("\n")
        .trim() || "";

    if (!output) {
      return sendJson(res, 502, {
        error: "Gemini returned an empty response."
      });
    }

    return sendJson(res, 200, {
      output
    });
  } catch (error) {
    console.error("LearnMate Gemini error:", error);

    return sendJson(res, 500, {
      error: "LearnMate could not reach the AI service right now."
    });
  }
};