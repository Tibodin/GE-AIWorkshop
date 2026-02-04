
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiResponse = async (history: ChatMessage[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are NeonFit, an elite AI Fitness Coach. 
        Your tone is motivating, professional, and slightly futuristic. 
        You specialize in weight training, nutrition, and recovery. 
        Provide concise, actionable advice. If asked for workouts, suggest movements from the library or new ones.`,
      },
    });

    // Note: In a real app, we might want to map history to the correct format
    // for now we'll send the latest message to keep it simple and avoid complex history mapping
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that. Let's try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of a technical glitch. Let's get back to training in a moment!";
  }
};
