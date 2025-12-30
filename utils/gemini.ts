import { GoogleGenAI } from "@google/genai";

export const generateNailConsultation = async (
  prompt: string, 
  apiKey: string
): Promise<{ text: string; imageUrl?: string }> => {
  if (!apiKey) {
    throw new Error("Clé API requise");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // 1. Generate the creative concept text
  const textModel = 'gemini-3-flash-preview';
  const systemInstruction = `Tu es une artiste ongulaire d'avant-garde de renommée mondiale nommée Shelley. 
  Ton style est Edgy, Y2K, Gothique et Haute Couture. 
  L'utilisateur décrira son style, sa tenue ou un événement. 
  Tu dois suggérer un design d'ongles spécifique (Forme, Longueur, Couleurs, Techniques artistiques) qui complète leur demande.
  Réponds toujours en français.
  Sois concise, cool et professionnelle. 
  Formate avec des sections claires : "Le Vibe", "Le Design", "Pourquoi ça marche".`;

  const textResponse = await ai.models.generateContent({
    model: textModel,
    contents: prompt,
    config: {
      systemInstruction,
    }
  });

  const generatedText = textResponse.text || "Impossible de générer une consultation. Veuillez réessayer.";

  // 2. Generate a visual representation (Image)
  // We use gemini-2.5-flash-image as it is broadly available for general generation tasks
  let generatedImageUrl: string | undefined;
  
  try {
    const imagePrompt = `Professional macro photography of nail art. ${generatedText.slice(0, 300)}. High detail, 8k resolution, cinematic lighting, photorealistic.`;
    
    // Switch to generateContent for gemini-2.5-flash-image model
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }],
      },
      config: {
        imageConfig: {
            aspectRatio: '3:4',
        }
      }
    });

    // Extract image from parts (looking for inlineData)
    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
        }
    }

  } catch (error) {
    console.warn("Image generation failed, returning text only", error);
    // Graceful degradation - just return text if image fails
  }

  return {
    text: generatedText,
    imageUrl: generatedImageUrl
  };
};