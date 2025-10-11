import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";
const talkCashy = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const { prompt} = req.body;
  const userId = req.userId;
  if (!prompt || !userId) return res.status(400).json({ message: "Invalid input" });
  try {
    const userExpenses = await Transaction.find({userid: new mongoose.Types.ObjectId(userId)})
      .sort({ date: -1 })
      .limit(100)
      .lean();
    const dbContext = `
      You are an assistant for the ExpenSaves app.
        User has the following recent expenses:
        ${JSON.stringify(userExpenses, null, 2)}

        You can answer:
        - Questions about user's expenses
        - Casual greetings, chit-chat, and general conversation

        Always respond in a friendly, human-readable way.
    `;

    let chatSession = model.startChat({ history: [] });

    const result = await chatSession.sendMessage(`${dbContext}\nUser Query: ${prompt}`);
    const responseText = result.response.text();
    return res.status(200).json({ answer: responseText });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to generate response", error });
  }
};

export { talkCashy };
