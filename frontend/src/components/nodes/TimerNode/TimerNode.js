
import { Position } from "reactflow";
import BaseNode from "../BaseNode/BaseNode";
import FormField from "../../common/FormField/FormField";
import wrapperStyles from "../../common/NodeWrapper.module.css";
import { TimerIcon } from "../../common/Icons";
import { useStore } from "../../../store/pipelineStore";

export const TimerNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      style: { top: "50%" },
    },
  ];

  return (
    <BaseNode
      title="Timer"
      icon={TimerIcon}
      handles={handles}
      selected={selected}
      data={data}
    >
      <div className={wrapperStyles.wrapper}>
        <FormField id={`${id}-duration`} label="Duration (s)">
          <input
            type="number"
            min="0"
            step="1"
            value={data.duration}
            onChange={(e) => updateNodeField(id, "duration", e.target.value)}
            placeholder="10"
          />
        </FormField>
      </div>
    </BaseNode>
  );
};
