import React from "react";
import { RuleType, FieldName, Operation, AmountValue } from "../types/rules";
import { currencyOptions, transactionStateOptions } from "../utils/variables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";

interface Props {
  rule: RuleType;
  onChange: (rule: RuleType) => void;
}

export function Rule({ rule, onChange }: Props) {
  // Handle field name change
  // This function updates the rule with the selected field name and sets a default value
  const handleFieldNameChange = (value: string) => {
    const fieldName = value as FieldName;
    let defaultValue: any = "";
    // defaultValue will be conditioned based on the field name
    switch (fieldName) {
      case "amount":
        defaultValue = {
          amount: 0,
          currency: "EUR",
        };
        break;
      case "installments":
        defaultValue = 0;
        break;
      case "transaction_state":
        defaultValue = "SUCCEEDED";
        break;
      default:
        defaultValue = "";
        break;
    }

    onChange({
      ...rule,
      fieldName,
      operation: "",
      value: defaultValue,
    });
  };

  // Handle operation change
  // This function updates the rule with the selected operation
  // and sets a default value
  const handleOperationChange = (value: string) => {
    const operation = value as Operation;
    onChange({
      ...rule,
      operation,
    });
  };

  // Handle value change
  // This function updates the rule with the new value based on the field name
  // and the selected operation
  // It also handles the special case for amount and installments
  // where the value is an object with amount and currency
  // or a number respectively
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    // Amount value is a special case as we need to handle the currency
    let newValue: string | number | AmountValue = 0;
    const value = typeof e === "string" ? e : e.target.value;
    if (rule.fieldName === "amount") {
      const amountValue = (rule.value as AmountValue) || {
        amount: 0,
        currency: "EUR",
      };
      if (typeof value === "string" && !isNaN(parseFloat(value))) {
        newValue = {
          ...amountValue,
          amount: parseFloat(value) || 0,
        };
      } else {
        newValue = {
          ...amountValue,
          currency: value,
        };
      }
    } else if (rule.fieldName === "installments") {
      newValue = parseInt(value) || 0;
    } else {
      newValue = value;
    }
    onChange({
      ...rule,
      value: newValue,
    });
  };

  // Render the value input based on the field name
  // This function returns the appropriate input field based on the field name
  // and the selected operation
  const renderValueInput = () => {
    if (!rule.fieldName) return null;

    switch (rule.fieldName) {
      case "amount":
        const amountValue = (rule.value as AmountValue) || {
          amount: 0,
          currency: "USD",
        };
        return (
          <div className="flex gap-2">
            <Input
              type="number"
              name="amount"
              value={amountValue.amount}
              onChange={handleValueChange}
              placeholder="Amount"
              className="border px-2 py-1 rounded"
            />
            <Select
              onValueChange={handleValueChange}
              defaultValue={amountValue.currency}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "transaction_state":
        return (
          <Select
            defaultValue={(rule.value as string) || ""}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Value" />
            </SelectTrigger>
            <SelectContent>
              {transactionStateOptions.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "installments":
        return (
          <Input
            type="number"
            name="value"
            value={(rule.value as number) || ""}
            onChange={handleValueChange}
            placeholder="Number of installments"
            className="border px-2 py-1 rounded"
          />
        );

      default:
        return (
          <Input
            name="value"
            value={(rule.value as string) || ""}
            onChange={handleValueChange}
            placeholder="Value"
            className="border px-2 py-1 rounded"
          />
        );
    }
  };

  // Get available operations based on the field name
  // This function returns the available operations based on the field name
  // and the selected operation
  const getAvailableOperations = (): Operation[] => {
    if (!rule.fieldName) return [];
    switch (rule.fieldName) {
      case "amount":
      case "installments":
        return ["EQUAL", "NOT_EQUAL", "GREATER_THAN", "LESS_THAN"];
      default:
        return ["EQUAL", "NOT_EQUAL"];
    }
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row items-center justify-center mb-4">
      <Select
        defaultValue={rule.fieldName || ""}
        onValueChange={handleFieldNameChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Field" />
        </SelectTrigger>
        <SelectContent>
          {[
            "name",
            "id",
            "amount",
            "transaction_state",
            "device_ip",
            "installments",
          ].map((field) => (
            <SelectItem key={field} value={field}>
              {field.replace("_", " ").toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={rule.operation || ""}
        onValueChange={handleOperationChange}
        disabled={!rule.fieldName}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Operation" />
        </SelectTrigger>
        <SelectContent>
          {getAvailableOperations().map((op) => (
            <SelectItem key={op} value={op}>
              {op.replace("_", " ").toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Render the value input based on the field name */}
      {rule.fieldName && renderValueInput()}
    </div>
  );
}
