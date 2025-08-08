import { DraggableNode } from "../common/DraggableNode/DraggableNode";
import { useTheme } from "../../ThemeContext";
import { MoonIcon, SunIcon, TrashIcon, KIcon } from "../common/Icons";
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
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="timer" label="Timer" />
        <DraggableNode type="conditionalLogic" label="Conditional" />
      </div>
      <div className="pipeline-toolbar__actions">
        <button
          onClick={clearCanvas}
          className="pipeline-toolbar__button"
          aria-label="Clear Canvas"
        >
          <TrashIcon className="pipeline-toolbar__icon" />
        </button>
        <button
          onClick={toggleTheme}
          className="pipeline-toolbar__button"
          aria-label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <MoonIcon className="pipeline-toolbar__icon" />
          ) : (
            <SunIcon className="pipeline-toolbar__icon" />
          )}
        </button>
        <a
          href="https://kripanshu-singh.github.io/me/"
          target="_blank"
          rel="noopener noreferrer"
          className="pipeline-toolbar__button"
          style={{borderRadius: "8px"}}
          aria-label="Kripanshu Singh Portfolio"
        >
          <KIcon className="pipeline-toolbar__icon" />
        </a>
      </div>
    </header>
  );
};
