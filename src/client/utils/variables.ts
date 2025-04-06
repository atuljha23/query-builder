import { TransactionState } from "../types/rules";

export const transactionStateOptions: TransactionState[] = [
  "SUCCEEDED",
  "REJECTED",
  "ERROR",
  "TIMEOUT",
  "CANCELLED",
  "FAILED",
  "ABORTED",
];

export const currencyOptions = ["USD", "EUR", "GBP"];
