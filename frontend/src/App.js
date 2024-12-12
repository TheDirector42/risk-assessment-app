import React, { useState } from "react";
import RiskAssessmentList from "./components/RiskAssessmentList";
import RiskAssessmentForm from "./components/RiskAssessmentForm";

const App = () => {
  const [editingData, setEditingData] = useState(null);

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleFormSuccess = () => {
    setEditingData(null);
  };

  return (
    <div>
      <h1>Risk Assessment App</h1>
      <RiskAssessmentList onEdit={handleEdit} />
      <RiskAssessmentForm
        existingData={editingData}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default App;
