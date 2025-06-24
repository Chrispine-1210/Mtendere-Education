import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

interface ChatResponse {
  message: string;
  shouldEscalate: boolean;
  suggestedActions?: string[];
}

export async function processEducationQuery(userMessage: string): Promise<ChatResponse> {
  try {
    const prompt = `You are an AI education consultant assistant for Mtendere Education Consult, helping African students with international education opportunities.

User message: "${userMessage}"

Please provide a helpful response about education consulting, university applications, scholarships, or study abroad opportunities. If the query is complex or requires personal consultation, suggest escalating to WhatsApp for human assistance.

Respond with JSON format:
{
  "message": "Your helpful response",
  "shouldEscalate": boolean (true if complex query needs human help),
  "suggestedActions": ["action1", "action2"] (optional quick action buttons)
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful education consultant AI assistant specializing in international education for African students. Always be professional, encouraging, and informative."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      message: result.message || "I'm here to help with your education queries. How can I assist you today?",
      shouldEscalate: result.shouldEscalate || false,
      suggestedActions: result.suggestedActions || []
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm having trouble processing your request right now. Please try again or contact our team directly for assistance.",
      shouldEscalate: true,
      suggestedActions: ["Contact Support", "Try Again"]
    };
  }
}

export async function generateUniversityRecommendations(
  level: string,
  field: string,
  budget?: string,
  location?: string
): Promise<string> {
  try {
    const prompt = `Generate university recommendations for a student with these preferences:
- Study Level: ${level}
- Field of Study: ${field}
- Budget: ${budget || 'Not specified'}
- Preferred Location: ${location || 'Any'}

Provide helpful guidance about suitable universities and application strategies.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert education consultant helping students find the right universities for their goals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 400,
    });

    return response.choices[0].message.content || "I'd be happy to help you find suitable universities. Please provide more details about your preferences.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm unable to generate recommendations right now. Please contact our education consultants for personalized assistance.";
  }
}
