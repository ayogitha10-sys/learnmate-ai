const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna";

function sendJson(res, status, body) {
  return res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(res, 500, {
      error: "OPENAI_API_KEY is not configured on the server."
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

    const instructions = `
You are LearnMate AI, an intelligent learning and career companion.

Learner name: ${learnerName}
Current career goal: ${careerGoal}

Your job is to help the learner understand what they want to achieve and guide them toward it.

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

    const input = [
      ...safeHistory,
      {
        role: "user",
        content: message.trim().slice(0, 8000)
      }
    ];

    const openaiResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        instructions,
        input,
        max_output_tokens: 1200
      })
    });

    const data = await openaiResponse.json().catch(() => ({}));

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);

      return sendJson(res, 502, {
        error:
          data?.error?.message ||
          "The AI service returned an error. Please try again."
      });
    }

    let output = "";

    if (typeof data.output_text === "string") {
      output = data.output_text;
    } else if (Array.isArray(data.output)) {
      output = data.output
        .flatMap((item) =>
          Array.isArray(item.content) ? item.content : []
        )
        .map((part) => part.text || "")
        .filter(Boolean)
        .join("\n");
    }

    if (!output.trim()) {
      return sendJson(res, 502, {
        error: "The AI service returned an empty response."
      });
    }

    return sendJson(res, 200, {
      output: output.trim()
    });
  } catch (error) {
    console.error("LearnMate /api/chat error:", error);

    return sendJson(res, 500, {
      error: "LearnMate could not reach the AI service right now."
    });
  }
};