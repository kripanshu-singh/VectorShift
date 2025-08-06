import { Position } from "reactflow";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { useStore } from "../../../store/pipelineStore";

export const InputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <div className={wrapperStyles.wrapper}>
      <div id={`name-${id}`} label="Field Name">
        <input
          type="text"
          value={data.inputName}
          onChange={(e) => updateNodeField(id, "inputName", e.target.value)}
        />
      </div>

      <div id={`type-${id}`} label="Type">
        <select
          value={data.inputType}
          onChange={(e) => updateNodeField(id, "inputType", e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Audio">Audio</option>
        </select>
      </div>
    </div>
  );
};
