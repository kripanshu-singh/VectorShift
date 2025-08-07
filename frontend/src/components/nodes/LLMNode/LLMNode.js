import { Position } from "reactflow";
import BaseNode from "../BaseNode/BaseNode";
import FormField from "../../common/FormField/FormField";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { LLMIcon } from "../../common/Icons";
import { useStore } from "../../../store/pipelineStore";
import styles from './LLMNode.module.css';

export const LLMNode = ({ id, data, selected }) => {

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "25%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "60%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      style: { top: "50%" },
    },
  ];

  return (
    <BaseNode
      title="LLM"
      icon={LLMIcon}
      handles={handles}
      selected={selected}
      data={data}
    >
      <div className={wrapperStyles.wrapper}>
        <FormField id={`${id}-model`} label="Model">
          <select
            value={data.model}
            onChange={(e) => updateNodeField(id, "model", e.target.value)}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude 3</option>
            <option value="llama-2">Llama 2</option>
          </select>
        </FormField>

        <div className={styles.grid}>
          <FormField id={`${id}-temperature`} label="Temperature">
            <input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={data.temperature}
              onChange={(e) =>
                updateNodeField(id, "temperature", e.target.value)
              }
              placeholder="0.7"
            />
          </FormField>

          <FormField id={`${id}-tokens`} label="Max Tokens">
            <input
              type="number"
              min="1"
              max="4000"
              step="1"
              value={data.maxTokens}
              onChange={(e) => updateNodeField(id, "maxTokens", e.target.value)}
              placeholder="1000"
            />
          </FormField>
        </div>

        <FormField id={`${id}-system-prompt`} label="System Prompt">
          <textarea
            value={data.systemPrompt}
            onChange={(e) =>
              updateNodeField(id, "systemPrompt", e.target.value)
            }
            placeholder="Define the AI's behavior and role..."
            rows={3}
            className={styles.textarea}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
