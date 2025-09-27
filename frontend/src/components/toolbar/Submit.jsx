// submit.js
import { useStore } from "../../store/store";
import { useToast } from "../ui/useToast";
import { ToastAction } from "../ui/Toast";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { useFetchPipelineData } from "../../hooks/useFetchPipelineData";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const { toast } = useToast();
  const { fetchPipeline, isLoading } = useFetchPipelineData();

  const showSuccessToast = (data) => {
    const validityMessage = data.is_dag
      ? "Pipeline is valid."
      : "Pipeline is not valid.";

    toast({
      title: "Pipeline Analysis",
      description: (
        <div className="flex flex-col space-y-1">
          <p>Number of Nodes: {data.num_nodes}</p>
          <p>Number of Edges: {data.num_edges}</p>
          <p>Is DAG: {data.is_dag.toString()}</p>
          <p className="font-medium text-base">{validityMessage}</p>
        </div>
      ),
      duration: 5000,
    });
  };

  const showErrorToast = (retryFunction) => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was an error submitting the pipeline.",
      action: (
        <ToastAction altText="Try again" onClick={retryFunction}>
          Try again
        </ToastAction>
      ),
      duration: 5000,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = await fetchPipeline(nodes, edges);
      showSuccessToast(data);
    } catch (error) {
      showErrorToast(handleSubmit);
      console.error("There was an error submitting the pipeline:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        type="submit"
        variant="outline"
        onClick={handleSubmit}
        disabled={isLoading}
        className="space-x-1"
      >
        <span>{isLoading ? "Submitting..." : "Submit Pipeline"}</span>
        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};