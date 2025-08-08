import { useTheme } from "../../ThemeContext";
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../../store/pipelineStore";
import { shallow } from "zustand/shallow";
import { InputNode } from "../nodes/InputNode/InputNode";
import { LLMNode } from "../nodes/LLMNode/LLMNode";
import { OutputNode } from "../nodes/OutputNode/OutputNode";
import { TextNode } from "../nodes/TextNode/TextNode";
import { MathNode } from "../nodes/MathNode/MathNode";
import { TimerNode } from "../nodes/TimerNode/TimerNode";
import { ConditionalLogicNode } from "../nodes/ConditionalLogicNode/ConditionalLogicNode";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  timer: TimerNode,
  conditionalLogic: ConditionalLogicNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const fitViewOptions = {
  padding: 0.2,
};

export const PipelineUI = () => {
  const { theme } = useTheme();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    const baseData = { id: nodeID, nodeType: type };
    switch (type) {
      case "customInput":
        return {
          ...baseData,
          inputName: nodeID.replace("customInput-", "input_"),
          inputType: "Text",
        };
      case "llm":
        return {
          ...baseData,
          model: "gpt-4",
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: "You are a helpful assistant.",
        };
      case "customOutput":
        return {
          ...baseData,
          outputName: nodeID.replace("customOutput-", "output_"),
          outputType: "Text",
          format: "raw",
          description: "",
        };
      case "text":
        return { ...baseData, text: "{{input}}" };
      case "math":
        return { ...baseData, operation: "add" };
      case "timer":
        return { ...baseData, duration: 10 };
      case "conditionalLogic":
        return { ...baseData, condition: "equals", compareValue: "" };
      default:
        return baseData;
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div className="pipeline-ui-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitViewOptions={fitViewOptions}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background
            gap={gridSize}
            color={theme === "dark" ? "#4a5568" : "#e0e0e0"}
            size={2}
          />
          <Controls position="bottom" />
          <MiniMap
            nodeClassName={(node) => `minimap-node-${node.type}`}
            pannable
          />
        </ReactFlow>
      </div>
    </>
  );
};
