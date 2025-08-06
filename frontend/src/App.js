import { PipelineToolbar } from './components/pipeline/PipelineToolbar';
import { PipelineUI } from './components/pipeline/PipelineUI';
import { SubmitButton } from './components/common/SubmitButton/SubmitButton';

function App() {
  return (
    <div className="app-container">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
