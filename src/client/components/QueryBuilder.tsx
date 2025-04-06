import React from "react";
import { GroupedRules } from "./groupedRules";
import { Rule } from "./Rule";

export function QueryBuilder(props: any) {
  return (
    <>
      <div>
        <h1 className="text-4xl">Query Builder</h1>
        <GroupedRules />
        <Rule />
      </div>
    </>
  );
}
