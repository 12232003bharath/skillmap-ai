const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-roadmap", (req, res) => {
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
- Follow beginner-to-intermediate tutorials
- Create small practice tasks

Week 3: Project Building
- Build one mini project related to ${role}
- Add clean UI and proper documentation
- Push the project to GitHub

Week 4: Portfolio & Interview Preparation
- Improve resume and LinkedIn profile
- Prepare common interview questions
- Deploy the project and share it publicly

Final Goal:
Become job-ready for ${role} with practical project experience.
`;

  res.json({ roadmap });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});