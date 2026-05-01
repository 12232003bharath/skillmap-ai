import "./App.css";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    skills: "",
    role: "",
    level: "Beginner",
    hours: "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateRoadmap = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setRoadmap(null);

  try {
    const response = await fetch("https://skillmap-ai-eig9.onrender.com/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    setRoadmap(data.roadmap);
  } catch (error) {
    setError("Unable to generate roadmap. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="app">
      <section className="hero">
        <div className="badge">🚀 SkillMap AI</div>

        <h1>Build your personalized career roadmap</h1>

        <p>
          Enter your skills and career goal to generate a smart learning roadmap.
        </p>

        <form className="roadmap-form" onSubmit={generateRoadmap}>
          <input
            type="text"
            placeholder="Your current skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Dream role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <input
            type="number"
            placeholder="Hours per week"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        {roadmap && (
          <div className="roadmap-box">
            <h2>Your Roadmap</h2>
            <pre>{roadmap}</pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;