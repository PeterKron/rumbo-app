export type TransactionType = {
  _id?: string,
  email: string;
  time: Date;
  amount: number;
  description: string;
  sum?: number;
  sourceReference?: string;
  status?: TransactionStatus;
};

export enum TransactionStatus {
  Final,
  Preliminary,
  Rejected
}

export type TimeReportType = {
  _id?: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: string;
}
