import { Position } from "reactflow";
import BaseNode from "../BaseNode/BaseNode";
import FormField from "../../common/FormField/FormField";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { MathIcon } from "../../common/Icons";
import { useStore } from "../../../store/pipelineStore";

export const MathNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-a`,
      style: { top: "30%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-b`,
      style: { top: "70%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-result`,
      style: { top: "50%" },
    },
  ];

  return (
    <BaseNode
      title="Math"
      icon={MathIcon}
      handles={handles}
      selected={selected}
      data={data}
    >
      <div className={wrapperStyles.wrapper}>
        <FormField id={`${id}-operation`} label="Operation">
          <select
            value={data.operation}
            onChange={(e) => updateNodeField(id, "operation", e.target.value)}
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </FormField>
      </div>
    </BaseNode>
  );
};
