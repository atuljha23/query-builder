import { useState } from "react";
import { GroupedRules } from "./groupedRules";
import { RuleGroupType } from "@/types/rules";
import { Button } from "./ui/button";
import { BackgroundGradient } from "./ui/background-gradient";
import { CodeBlock } from "./ui/codeblock";

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
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    "Build your query using the form below. Once you're done, click Submit to send the query to the server"
  );

  // Environment variables for API and app URLs
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const appUrl = import.meta.env.VITE_APP_BASE_URL;

  // Handler for when the query changes
  const handleQueryChange = (newQuery: RuleGroupType) => {
    setQuery(newQuery);
    setWelcomeMessage("Query updated! Click Submit to send the query.");
  };

  // Handler for when the form is submitted
  const handleSubmit = () => {
    console.log("Submitted query:", query);
    // Here we would typically send the query to our backend
    fetch(`${apiUrl}/save-rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .catch((error) => {
        console.error("Error submitting query:", error);
      })
      .then((response) => {
        if (response && response.ok) {
          setWelcomeMessage("Query submitted successfully!");
        } else {
          alert("Failed to submit query.");
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
      });
  };

  // useEffect(() => {
  //   console.log("Query updated:", query);
  // }, [query]); // For debugging purposes

  return (
    <div className="relative shadow-md w-full items-center justify-center gap-4 p-4">
      <h1 className="text-4xl flex text-red-400 dark:text-blue-100 font-bold justify-center m-4">
        Query Builder
      </h1>
      <p className="text-gray-500 dark:text-gray-300 text-center m-4">
        {welcomeMessage}
      </p>
      <BackgroundGradient className="rounded-3xl p-6 flex-1 bg-white dark:bg-zinc-900 shadow-md max-h-screen overflow-auto">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg p-4 shadow-sm">
          <div className="flex flex-row gap-4 w-full">
            <div className="flex-1">
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
          <Button
            variant="default"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Submit
          </Button>
        </div>
      </BackgroundGradient>
    </div>
  );
}
