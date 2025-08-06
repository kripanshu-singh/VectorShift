import { DraggableNode } from "../common/DraggableNode/DraggableNode";
import { useTheme } from "../../ThemeContext";
import { useStore } from "../../store/pipelineStore";

export const PipelineToolbar = () => {
  const { theme, toggleTheme } = useTheme();
  const clearCanvas = useStore((state) => state.clearCanvas);

  return (
    <header className="pipeline-toolbar">
      <div className="pipeline-toolbar__nodes">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
      </div>
      <div className="pipeline-toolbar__actions"></div>
    </header>
  );
};
