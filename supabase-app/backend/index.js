import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/todos", async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .insert({ text })
    .select();
  if (error) return res.status(400).json(error);
  res.json(data[0]);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const { data, error } = await supabase
    .from("todos")
    .update({ done })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json(error);
  res.json(data[0]);
});

app.listen(3000, () => console.log("API running in http://localhost:3000"));
