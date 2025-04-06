import { useState } from "react";
import { GroupedRules } from "./groupedRules";
import { RuleGroupType } from "@/types/rules";

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
  return (
    <>
      <div>
        <h1 className="text-6xl">Query Builder</h1>
        <div className="flex-1">
          <GroupedRules group={query} onChange={setQuery} isRoot={true} />
        </div>
      </div>
    </>
  );
}
