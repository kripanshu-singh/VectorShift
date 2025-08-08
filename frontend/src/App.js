import { PipelineUI } from "./components/pipeline/PipelineUI";
import { ThemeProvider } from "./ThemeContext";
import { PipelineToolbar } from "./components/pipeline/PipelineToolbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Toaster />
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </ThemeProvider>
  );
}

export default App;
