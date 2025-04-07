import { useState } from "react";
import { GroupedRules } from "./groupedRules";
import { RuleGroupType } from "@/types/rules";
import { Button } from "./ui/button";
import { BackgroundGradient } from "./ui/background-gradient";
import { CodeBlock } from "./ui/codeblock";
import { toast } from "sonner";

// This is the initial state of the query builder
const initialGroup: RuleGroupType = {
  combinator: "AND",
  conditions: [
    {
      fieldName: "name",
      operation: "EQUAL",
      value: "",
    },
  ],
};

export function QueryBuilder() {
  // State to manage the query and welcome message
  const [query, setQuery] = useState<RuleGroupType>(initialGroup);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    "Build your query using the form below. Once you're done, click Submit to send the query to the server"
  );

  // Environment variables for API and app URLs
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const appUrl = import.meta.env.VITE_APP_BASE_URL;

  // Handler for when the query changes
  const handleQueryChange = (newQuery: RuleGroupType) => {
    setQuery(newQuery);
    setWelcomeMessage(
      "Query updated! Click Submit to send the json payload to the server ⚡"
    );
    setSubmitDisabled(false);
  };

  // Handler for when the form is submitted
  const handleSubmit = () => {
    // Here we would typically send the query to our backend
    fetch(`${apiUrl}/save-rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .catch((error) => {
        console.error("Error submitting query:", error);
        toast.error("Failed to submit query.");
        setWelcomeMessage("Failed to submit query, please try again.");
      })
      .then((response) => {
        if (response && response.ok) {
          setWelcomeMessage("Query submitted successfully!");
          toast.success("Query submitted successfully!");
        } else {
          alert("Failed to submit query.");
          setWelcomeMessage("Failed to submit query, please try again.");
          toast.error("Failed to submit query.");
        }
      })
      .finally(() => {
        // Download the file that was created
        const link = document.createElement("a");
        link.href = `${appUrl}/rules.json`;
        link.download = "rules.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("File downloaded successfully!");
      });
  };

  // useEffect(() => {
  //   console.log("Query updated:", query);
  // }, [query]); // For debugging purposes

  return (
    <div className="flex flex-col shadow-lg w-full items-center justify-center gap-4 p-4 rounded">
      <div>
        <h1 className="text-lg md:text-4xl flex text-purple-400 dark:text-blue-100 font-bold justify-center mb-4">
          Query Builder 👷🏻🛠️
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-center m-4 text-base md:text-lg">
          {welcomeMessage}
        </p>
      </div>
      <BackgroundGradient className="rounded-3xl pl-6 pt-6 pr-6 flex-1 bg-white dark:bg-zinc-900 shadow-md w-full mx-auto">
        <div className="max-h-[calc(100vh-18rem)] overflow-auto rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="">
              <GroupedRules
                group={query}
                onChange={handleQueryChange}
                isRoot={true}
              />
            </div>
            <div className="rounded-sm border dark:border-gray-400 border-gray-800">
              <div className="flex p-1 items-center justify-between bg-gray-400">
                <h2 className="text-sm font-semibold">Query Preview</h2>
              </div>
              <CodeBlock
                code={JSON.stringify(query, null, 2)}
                language="json"
                filename="query.json"
              />
            </div>
          </div>
        </div>
      </BackgroundGradient>
      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={submitDisabled}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-full"
      >
        Submit
      </Button>
    </div>
  );
}
