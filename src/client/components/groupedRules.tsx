import React from "react";
import { RuleGroupType, RuleType, Combinator } from "../types/rules";
import { Rule } from "./Rule";
import { FaMinus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdAddModerator } from "react-icons/md";
import { RiFunctionAddFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  group: RuleGroupType;
  onChange: (group: RuleGroupType) => void;
  isRoot?: boolean;
}

export function GroupedRules(props: Props) {
  // Destructure props
  const { group, onChange, isRoot } = props;
  // Determine if the group is a root group
  const currentConditions = isRoot ? group.conditions : group.subConditions;

  // Handle adding a new rule
  const handleAddRule = () => {
    const newRule: RuleType = {
      fieldName: "name",
      operation: "EQUAL",
      value: "",
    };

    if (isRoot) {
      onChange({
        ...group,
        conditions: [...(group.conditions || []), newRule],
      });
    } else {
      onChange({
        ...group,
        subConditions: [...(group.subConditions || []), newRule],
      });
    }
  };

  // Handle adding a new group
  const handleAddGroup = () => {
    const newGroup: RuleGroupType = {
      combinator: "AND",
      subConditions: [
        {
          fieldName: "name",
          operation: "EQUAL",
          value: "",
        },
      ],
    };
    // Add the new group to the appropriate conditions
    if (isRoot) {
      onChange({
        ...group,
        conditions: [...(group.conditions || []), newGroup] as Array<
          RuleType | RuleGroupType
        >,
      });
    } else {
      onChange({
        ...group,
        subConditions: [...(group.subConditions || []), newGroup],
      });
    }
  };

  // Handle changing the combinator
  const handleCombinatorsChange = (value: string) => {
    const combinator = value as Combinator;
    onChange({
      ...group,
      combinator,
    });
  };

  // Handle changing a condition
  const handleConditionChange = (
    index: number,
    updated: RuleType | RuleGroupType
  ) => {
    if (isRoot) {
      const newConditions = [...(group.conditions || [])];
      newConditions[index] = updated;
      onChange({ ...group, conditions: newConditions });
    } else {
      const newSubConditions = [...(group.subConditions || [])];
      newSubConditions[index] = updated;
      onChange({ ...group, subConditions: newSubConditions });
    }
  };

  // Handle deleting a condition
  const handleDeleteCondition = (index: number) => {
    // Check if the group is a root group and based on that filter the conditions
    // to remove the condition at the specified index
    if (isRoot) {
      const newConditions = (group.conditions || []).filter(
        (_, i) => i !== index
      );
      onChange({ ...group, conditions: newConditions });
    } else {
      const newSubConditions = (group.subConditions || []).filter(
        (_, i) => i !== index
      );
      onChange({ ...group, subConditions: newSubConditions });
    }
  };

  return (
    <div className="border rounded bg-white dark:bg-zinc-900 shadow-md">
      <div className="flex p-1 items-center justify-between bg-gray-400">
        <h2 className="text-sm font-semibold">Rule Group</h2>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <label className="font-medium">Combinator:</label>
          <Select
            defaultValue={group.combinator}
            onValueChange={handleCombinatorsChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Combinator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 mt-4">
          {currentConditions?.map((cond, index) => (
            <div
              key={index}
              className="p-2 border rounded bg-grey-50 relative flex items-center gap-4"
            >
              <div className="flex gap-4">
                {"combinator" in cond ? ( // Check if the condition is a group or a rule
                  <GroupedRules
                    group={cond as RuleGroupType}
                    onChange={(updated) =>
                      handleConditionChange(index, updated)
                    }
                    isRoot={false}
                  />
                ) : (
                  <Rule
                    rule={cond}
                    onChange={(updated) =>
                      handleConditionChange(index, updated)
                    }
                  />
                )}
                <Button
                  disabled={currentConditions.length <= 1}
                  onClick={() => handleDeleteCondition(index)}
                  variant="destructive"
                  className="px-12 py-4 rounded"
                  title="Delete"
                >
                  <FaMinus />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleAddRule}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            <MdAddModerator />
            Add Rule
          </Button>
          <Button
            onClick={handleAddGroup}
            className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
          >
            <RiFunctionAddFill /> Add Group
          </Button>
        </div>
      </div>
    </div>
  );
}
