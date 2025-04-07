import { useEffect, useState } from "react";
import { GroupedRules } from "./groupedRules";
import { RuleGroupType } from "@/types/rules";
import { Button } from "./ui/button";
import { BackgroundGradient } from "./ui/background-gradient";
import { CodeBlock } from "./ui/codeblock";

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
  const [query, setQuery] = useState<RuleGroupType>(initialGroup);

  const handleSubmit = () => {
    console.log("Submitted query:", query);
    // Here you would typically send the query to your backend
    // fetch('/api/save-rules', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(query)
    // })
  };

  useEffect(() => {
    console.log("Query updated:", query);
  }, [query]);
  return (
    <div className="relative shadow-md w-full items-center justify-center gap-4 p-4">
      <h1 className="text-4xl flex font-bold justify-center">Query Builder</h1>
      <BackgroundGradient className="rounded-3xl p-6 flex-1 bg-white dark:bg-zinc-900 shadow-md">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg p-4 shadow-sm">
          <div className="flex flex-row gap-4 w-full">
            <div className="flex-1">
              <GroupedRules group={query} onChange={setQuery} isRoot={true} />
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
