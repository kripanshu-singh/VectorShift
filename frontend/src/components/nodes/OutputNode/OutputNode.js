import { Position } from "reactflow";
import BaseNode from "../BaseNode/BaseNode";
import FormField from "../../common/FormField/FormField";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { OutputIcon } from "../../common/Icons";
import { useStore } from "../../../store/pipelineStore";

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
      style: { top: "50%" },
    },
  ];

  return (
    <BaseNode
      title="Output"
      icon={OutputIcon}
      handles={handles}
      selected={selected}
      data={data}
    >
      <div className={wrapperStyles.wrapper}>
        <FormField id={`${id}-name`} label="Output Name">
          <input
            type="text"
            value={data.outputName}
            onChange={(e) => updateNodeField(id, "outputName", e.target.value)}
            placeholder="e.g., final_result, processed_data"
          />
        </FormField>

        <FormField id={`${id}-type`} label="Output Type">
          <select
            value={data.outputType}
            onChange={(e) =>
              updateNodeField(id, "outputType", e.target.value)
            }
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
            <option value="JSON">JSON</option>
            <option value="Array">Array</option>
          </select>
        </FormField>

        <FormField id={`${id}-format`} label="Format">
          <select
            value={data.format}
            onChange={(e) => updateNodeField(id, "format", e.target.value)}
          >
            <option value="raw">Raw Output</option>
            <option value="formatted">Formatted</option>
            <option value="minified">Minified</option>
            <option value="pretty">Pretty Print</option>
          </select>
        </FormField>

        <FormField id={`${id}-description`} label="Description">
          <textarea
            value={data.description}
            onChange={(e) =>
              updateNodeField(id, "description", e.target.value)
            }
            placeholder="Describe what this output represents..."
            rows={2}
            style={{ resize: "vertical" }}
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
