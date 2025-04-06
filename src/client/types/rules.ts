export type FieldName =
  | ""
  | "amount"
  | "name"
  | "id"
  | "transaction_state"
  | "device_ip"
  | "installments";

export type Operation =
  | "EQUAL"
  | "NOT_EQUAL"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "";

export type Combinator = "AND" | "OR";

export type TransactionState =
  | "SUCCEEDED"
  | "REJECTED"
  | "ERROR"
  | "TIMEOUT"
  | "CANCELLED"
  | "FAILED"
  | "ABORTED";

export interface AmountValue {
  amount: number;
  currency: string;
}

export type FieldValue = string | number | AmountValue | TransactionState;

export interface RuleType {
  fieldName: FieldName;
  operation: Operation;
  value: FieldValue;
}

export interface RuleGroupType {
  combinator: Combinator;
  conditions?: Array<RuleType | RuleGroupType>;
  subConditions?: Array<RuleType | RuleGroupType>;
}
