import React, { useState } from "react";
import { createRiskAssessment, updateRiskAssessment } from "../api/api";

const initialFormState = {
  name: "",
  description: "",
  leaders: "",
  ageGroups: "",
  numOfStudents: "",
  startDate: "",
  endDate: "",
  overallRisk: "",
  hazards: [],
};

const RiskAssessmentForm = ({ existingData, onSuccess }) => {
  const [form, setForm] = useState(existingData || initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await updateRiskAssessment(form.id, form);
    } else {
      await createRiskAssessment(form);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.id ? "Edit" : "Create"} Risk Assessment</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="leaders"
        value={form.leaders}
        onChange={handleChange}
        placeholder="Leaders"
        required
      />
      <input
        name="ageGroups"
        value={form.ageGroups}
        onChange={handleChange}
        placeholder="Age Groups"
        required
      />
      <input
        name="numOfStudents"
        value={form.numOfStudents}
        onChange={handleChange}
        placeholder="Number of Students"
        required
      />
      <input
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        placeholder="Start Date"
        required
      />
      <input
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        placeholder="End Date"
        required
      />
      <input
        name="overallRisk"
        value={form.overallRisk}
        onChange={handleChange}
        placeholder="Overall Risk"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default RiskAssessmentForm;
