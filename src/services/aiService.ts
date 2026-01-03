import { app } from "../lib/firebase";
// import { getVertexAI, getGenerativeModel } from "firebase/vertexai"; // Not serving
import { NoteContent } from "./noteService";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// Initialization wrapper to handle potential environment issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let model: any = null;

const initializeAI = () => {
  if (model) return model;
  
  try {
    if (!app) {
      console.warn("Firebase app not initialized, cannot init AI.");
      return null;
    }

    // Based on the user's doc content:
    // Cast app to any to avoid type issues with the mock/partial app object from firebase.ts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ai = getAI(app as any, { backend: new GoogleAIBackend() });
    model = getGenerativeModel(ai, { model: "gemini-2.5-flash" }); // Updated to 2.5-flash
    
    return model;
  } catch (e) {
    console.error("Failed to initialize Firebase AI:", e);
    return null;
  }
};

export const generateCornellNote = async (topic: string, course: string = "General"): Promise<NoteContent | null> => {
    const aiModel = initializeAI();
    if (!aiModel) {
        throw new Error("AI Model not initialized");
    }

    const prompt = `
    Generate a comprehensive Cornell Note on the topic: "${topic}".
    Context/Course: ${course}.

    IMPORTANT FORMATTING RULES:
    1. Use KaTeX/LaTeX syntax for ALL mathematical expressions, formulas, and equations:
       - Use $...$ for inline math (e.g., $E = mc^2$, $\\frac{a}{b}$, $x^2 + y^2 = r^2$)
       - Use $$...$$ for display/block math equations that should be centered on their own line
    2. For scientific notation, use LaTeX: $3.0 \\times 10^8$ instead of 3.0×10⁸
    3. For fractions, use: $\\frac{numerator}{denominator}$
    4. For subscripts/superscripts: $H_2O$, $x^2$
    5. For Greek letters: $\\alpha$, $\\beta$, $\\pi$, $\\theta$
    6. For integrals: $\\int_a^b f(x)dx$
    7. For summations: $\\sum_{i=1}^{n} x_i$
    8. For square roots: $\\sqrt{x}$, $\\sqrt[3]{x}$
    9. Use proper LaTeX for vectors, matrices, and other mathematical structures
    10. Even for simple numbers in mathematical context, wrap them: $n = 5$

    The output MUST be valid JSON strictly adhering to the following structure:
    {
      "metadata": {
        "topic": "Topic Name",
        "date": "YYYY-MM-DD",
        "course": "Course Name",
        "objective": "Learning objective"
      },
      "rows": [
        { "id": "1", "cue": "Key Point/Question", "note": "Detailed explanation with LaTeX math like $formula$ embedded in text" },
        ...
      ],
      "summary": "Summary of the notes with any key formulas like $formula$"
    }

    CRITICAL: 
    - Do NOT include markdown code blocks (like \`\`\`json). Return ONLY the raw JSON string.
    - Escape backslashes properly in JSON: use double backslash \\\\ for LaTeX commands (e.g., "\\\\frac{1}{2}" in JSON)
    - Ensure "rows" has at least 5-7 detailed entries with rich explanations
    - Make cues concise questions or key terms
    - Make notes detailed explanations with examples and formulas where applicable
    `;

    try {
        const result = await aiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Basic cleanup if the model still returns markdown
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const noteContent: NoteContent = JSON.parse(cleanedText);
        
        // Ensure IDs are unique if the model messed up, though we asked for it.
        // We can just regenerate IDs here to be safe.
        noteContent.rows = noteContent.rows.map((row, index) => ({
            ...row,
            id: `row-${Date.now()}-${index}`
        }));

        return noteContent;
    } catch (error) {
        console.error("Error generating Cornell Note:", error);
        throw error;
    }
};
