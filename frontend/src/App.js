import { PipelineToolbar } from "./layouts/PipelineToolbar";
import { PipelineUI } from "./layouts/PipelineUI";
import { Toaster } from "./components/ui/Toaster";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <Toaster />
    </div>
  );
}

export default App;