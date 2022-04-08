export type Transaction = {
  _id?: string,
  email: string;
  time: Date;
  amount: number;
  description: string;
  sum?: number;
  editMode?: boolean;
  sourceReference?: string;
  status: TransactionStatus;
};

export enum TransactionStatus {
  Final,
  Preliminary,
  Rejected,
  New
}

export type TimeReport = {
  _id: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: string;
  editMode?: boolean;
};

// export type NewTimeReport = {
//   id: number,
//   email: string;
//   time: Date;
//   description: string;
//   hours?: number;
//   project_id: number;
//   editMode?: boolean;
// };

export type DateFilter = {
  year: number;
  month: number;
};

export type TransactionFilter = {
  year: number;
  month: number;
  description?: string;
};
