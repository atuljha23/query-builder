import React from "react";
import { GroupedRules } from "./groupedRules";
import { Rule } from "./Rule";

export function QueryBuilder(props: any) {
  return (
    <>
      <div>
        <h1 className="text-6xl">Query Builder</h1>
        <GroupedRules />
        <Rule
          rule={{
            fieldName: "name",
            operation: "EQUAL",
            value: "John Doe",
          }}
          onChange={(rule) => console.log(rule)}
        />
      </div>
    </>
  );
}
