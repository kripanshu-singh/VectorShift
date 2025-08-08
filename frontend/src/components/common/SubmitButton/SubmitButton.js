import React, { useState } from "react";
import { useStore } from "../../../store/pipelineStore";
import styles from "./SubmitButton.module.css";
import toast from "react-hot-toast";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://vectorshift-mq21.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        },
      );
      const result = await response.json();
      toast.success(
        `Number of Nodes: ${result.num_nodes}\nNumber of Edges: ${
          result.num_edges
        }\nIs DAG: ${result.is_dag ? "Yes" : "No"}`,
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      toast.error("Failed to submit pipeline. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
};
