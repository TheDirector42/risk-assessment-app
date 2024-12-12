const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to JSON files
const hazardsPath = path.join(__dirname, "data", "hazards.json");
const riskAssessmentsPath = path.join(
  __dirname,
  "data",
  "riskAssessments.json"
);

// Utility function to read JSON files
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return [];
  }
};

// Utility function to write JSON files
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing to file ${filePath}:`, err);
  }
};

// Routes for Hazards
// GET all hazards
app.get("/api/hazards", (req, res) => {
  const hazards = readJSONFile(hazardsPath);
  res.json(hazards);
});

// POST a new hazard
app.post("/api/hazards", (req, res) => {
  const hazards = readJSONFile(hazardsPath);
  const newHazard = { id: Date.now(), ...req.body };
  hazards.push(newHazard);
  writeJSONFile(hazardsPath, hazards);
  res.status(201).json(newHazard);
});

// DELETE a hazard
app.delete("/api/hazards/:id", (req, res) => {
  const hazards = readJSONFile(hazardsPath);
  const { id } = req.params;
  const updatedHazards = hazards.filter((hazard) => hazard.id !== parseInt(id));

  if (hazards.length !== updatedHazards.length) {
    writeJSONFile(hazardsPath, updatedHazards);
    res.status(200).json({ message: "Hazard deleted" });
  } else {
    res.status(404).json({ message: "Hazard not found" });
  }
});

// Routes for Risk Assessments
// GET all risk assessments
app.get("/api/risk-assessments", (req, res) => {
  const riskAssessments = readJSONFile(riskAssessmentsPath);
  res.json(riskAssessments);
});

// GET a single risk assessment by ID
app.get("/api/risk-assessments/:id", (req, res) => {
  const riskAssessments = readJSONFile(riskAssessmentsPath);
  const riskAssessment = riskAssessments.find(
    (ra) => ra.id === parseInt(req.params.id)
  );

  if (riskAssessment) {
    res.json(riskAssessment);
  } else {
    res.status(404).json({ message: "Risk assessment not found" });
  }
});

// POST a new risk assessment
app.post("/api/risk-assessments", (req, res) => {
  const riskAssessments = readJSONFile(riskAssessmentsPath);
  const newRiskAssessment = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    leaders: req.body.leaders,
    ageGroups: req.body.ageGroups,
    numOfStudents: req.body.numOfStudents,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    overallRisk: req.body.overallRisk,
    hazards: req.body.hazards || [],
  };

  riskAssessments.push(newRiskAssessment);
  writeJSONFile(riskAssessmentsPath, riskAssessments);
  res.status(201).json(newRiskAssessment);
});

// PUT (update) a risk assessment by ID
app.put("/api/risk-assessments/:id", (req, res) => {
  const riskAssessments = readJSONFile(riskAssessmentsPath);
  const index = riskAssessments.findIndex(
    (ra) => ra.id === parseInt(req.params.id)
  );

  if (index !== -1) {
    const updatedRiskAssessment = {
      ...riskAssessments[index],
      ...req.body,
    };

    riskAssessments[index] = updatedRiskAssessment;
    writeJSONFile(riskAssessmentsPath, riskAssessments);
    res.json(updatedRiskAssessment);
  } else {
    res.status(404).json({ message: "Risk assessment not found" });
  }
});

// DELETE a risk assessment by ID
app.delete("/api/risk-assessments/:id", (req, res) => {
  const riskAssessments = readJSONFile(riskAssessmentsPath);
  const updatedRiskAssessments = riskAssessments.filter(
    (ra) => ra.id !== parseInt(req.params.id)
  );

  if (riskAssessments.length !== updatedRiskAssessments.length) {
    writeJSONFile(riskAssessmentsPath, updatedRiskAssessments);
    res.status(200).json({ message: "Risk assessment deleted" });
  } else {
    res.status(404).json({ message: "Risk assessment not found" });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Risk Assessment Backend is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
