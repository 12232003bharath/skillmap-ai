const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/generate-roadmap", async (req, res) => {
  try {
    console.log("API HIT");
    console.log("Body:", req.body);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);

    const { skills, role, level, hours } = req.body;

    const roadmap = `
🚀 Personalized Roadmap for ${role}

Current Level: ${level}
Current Skills: ${skills}
Weekly Time Commitment: ${hours} hours/week

Week 1: Foundation Strengthening
- Revise core concepts related to ${skills}
- Identify skill gaps for becoming a ${role}
- Set up a weekly learning schedule

Week 2: Tool & Technology Learning
- Learn important tools required for ${role}

Week 3: Project Building
- Build one mini project related to ${role}

Week 4: Portfolio & Interview Preparation
- Deploy the project and share it publicly
`;

    const result = await pool.query(
      "INSERT INTO roadmaps (skills, role, level, hours, roadmap) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [skills, role, level, hours, roadmap]
    );

    console.log("Inserted row:", result.rows[0]);

    res.json({ roadmap });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ message: "Database save failed", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});