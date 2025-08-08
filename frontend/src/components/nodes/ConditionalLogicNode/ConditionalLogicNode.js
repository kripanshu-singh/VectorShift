import { Position } from "reactflow";
import BaseNode from "../BaseNode/BaseNode";
import FormField from "../../common/FormField/FormField";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { ConditionalLogicIcon } from "../../common/Icons";
import { useStore } from "../../../store/pipelineStore";

export const ConditionalLogicNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: { top: "30%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: { top: "70%" },
    },
  ];

  return (
    <BaseNode
      title="Conditional Logic"
      icon={ConditionalLogicIcon}
      handles={handles}
      selected={selected}
      data={data}
    >
      <div className={wrapperStyles.wrapper}>
        <FormField id={`${id}-condition`} label="Condition">
          <select
            value={data.condition}
            onChange={(e) => updateNodeField(id, "condition", e.target.value)}
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
          </select>
        </FormField>
        <FormField id={`${id}-compareValue`} label="Compare Value">
          <input
            type="text"
            value={data.compareValue}
            onChange={(e) =>
              updateNodeField(id, "compareValue", e.target.value)
            }
            placeholder="Value to compare"
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
