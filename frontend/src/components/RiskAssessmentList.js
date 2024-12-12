import React, { useEffect, useState } from "react";
import { getRiskAssessments, deleteRiskAssessment } from "../api/api";

const RiskAssessmentList = ({ onEdit }) => {
  const [riskAssessments, setRiskAssessments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiskAssessments();
      setRiskAssessments(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteRiskAssessment(id);
    setRiskAssessments(riskAssessments.filter((ra) => ra.id !== id));
  };

  return (
    <div>
      <h2>Risk Assessments</h2>
      <ul>
        {riskAssessments.map((ra) => (
          <li key={ra.id}>
            <strong>{ra.name}</strong>: {ra.description}
            <button onClick={() => onEdit(ra)}>Edit</button>
            <button onClick={() => handleDelete(ra.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskAssessmentList;
