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

interface Props {
  rule: RuleType;
  onChange: (rule: RuleType) => void;
}

export function Rule({ rule, onChange }: Props) {
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

  const handleOperationChange = (value: string) => {
    const operation = value as Operation;
    onChange({
      ...rule,
      operation,
    });
  };

  const handleValueChange = (value: any) => {
    // Amount value is a special case as we need to handle the currency
    let newValue: string | number | AmountValue = 0;

    if (rule.fieldName === "amount") {
      const amountValue = (rule.value as AmountValue) || {
        amount: 0,
        currency: "EUR",
      };
      if (value === "amount") {
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
            <input
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
          <input
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
          <input
            name="value"
            value={(rule.value as string) || ""}
            onChange={handleValueChange}
            placeholder="Value"
            className="border px-2 py-1 rounded"
          />
        );
    }
  };

  const getAvailableOperations = (): Operation[] => {
    if (!rule.fieldName) return [];
    console.log("Getting operations for fieldName:", rule.fieldName); // Debugging
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
      {rule.fieldName && renderValueInput()}
    </div>
  );
}
