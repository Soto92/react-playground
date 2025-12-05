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

// ---------------------
// GET /todos
// ---------------------
app.get("/todos", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------
// POST /todos
// ---------------------
app.post("/todos", async (req, res) => {
  const { text } = req.body;

  try {
    const { data, error } = await supabase
      .from("todos")
      .insert({ text })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------
// PUT /todos/:id/toggle
// ---------------------
app.put("/todos/:id/toggle", async (req, res) => {
  const { id } = req.params;

  try {
    const { data: item, error: getError } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (getError) throw getError;

    const { data, error } = await supabase
      .from("todos")
      .update({ done: !item.done })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
