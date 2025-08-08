import { useStore } from '../../../store/pipelineStore';
import styles from './SubmitButton.module.css';

export const SubmitButton = () => {
    const { nodes, edges } = useStore();

    const handleSubmit = async () => {
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
            alert(`Number of Nodes: ${result.num_nodes}\nNumber of Edges: ${result.num_edges}\nIs DAG: ${result.is_dag ? 'Yes' : 'No'}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. See console for details.');
        }
    };

    return (
        <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSubmit} className={styles.submitButton}>
                Submit
            </button>
        </div>
    );
}
