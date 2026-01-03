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
    GENERATE CORNELL NOTES CONTENT.
    Topic: "${topic}"
    Context: ${course}

    STRICT MATH RENDERING RULES (KaTeX ONLY):
    1.  Use ONLY '$' for inline math and '$$' for block equations.
    2.  DO NOT use '\\(' or '\\[' or '\\begin{equation}'. These will break the renderer.
    3.  Example: Use $E=mc^2$ NOT \\(E=mc^2\\).
    4.  Scientific notation: $3.0 \\times 10^8$
    5.  Fractions: $\\frac{a}{b}$
    6.  **NON-LATIN TEXT (e.g. Sinhala, Tamil)**:
        - DO NOT put non-Latin text inside '$...$' delimiters unless wrapped in '\\text{...}'.
        - KaTeX cannot render raw non-Latin characters directly.
        - INCORRECT: $එස්ටර$
        - CORRECT: එස්ටර (keep outside math) OR $\\text{එස්ටර}$ (wrapped)
        - Prefer keeping non-mathematical text OUTSIDE of the math delimiters completely.

    SUMMARY FORMATTING RULES:
    1.  The "summary" field MUST use bullet points if there are multiple key takeaways.
    2.  Use a hyphen '- ' for each bullet point.
    3.  Do NOT use markdown headers (##) in the summary.

    OUTPUT FORMAT (JSON ONLY):
    {
      "metadata": {
        "topic": "Title",
        "date": "YYYY-MM-DD",
        "course": "Course Name",
        "objective": "Learning objective"
      },
      "rows": [
        { "id": "1", "cue": "Question?", "note": "Explanation with $math$..." },
        ... 5-7 rows ...
      ],
      "summary": "- Key point 1 with $math$\\n- Key point 2\\n- Key point 3"
    }

    CRITICAL:
    - Return RAW JSON string only. NO markdown blocks.
    - Escape all backslashes properly (e.g. "\\\\frac").`;

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
