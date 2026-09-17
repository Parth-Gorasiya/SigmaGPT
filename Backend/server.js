import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api', chatRoutes);

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected with Database!");
  }catch(err){
    console.log("Failed to connect with the DB", err);
  }
}

// app.post("/test", async (req, res) => {
//   const { message } = req.body;

//   if (!message?.trim()) {
//     return res.status(400).json({
//       error: "Message is required",
//     });
//   }

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "openai/gpt-oss-20b",
//       messages: [
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       options
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error(data);

//       return res.status(response.status).json({
//         error: data.error?.message || "Groq API request failed",
//       });
//     }

//     const reply = data.choices[0].message.content;

//     //console.log(reply);
//     res.send(reply);
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: "Unable to connect to the AI service",
//     });
//   }
// }); // Closes app.post()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});