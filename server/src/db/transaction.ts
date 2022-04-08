// import { query } from "./db";
import { TransactionType, TransactionStatus } from "../types";
import { TransactionModel } from "./models/models"

type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};

export const getTransactions = async ({email,year,month,description}: getTransactionFilter) => {
  let params = {};
  if (email) {
      params['email'] = email;
  }
  if (year && !month) {
      params['year'] = {$gt: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)} 
    }
    if (month && year) {
      params['month'] = {$gt: new Date(year, month-1, 1), $lt: new Date(year, month, 1)}
    }
    if(description){
      params['description'] = { '$regex' : '.*' + description + '.*', '$options' : 'i' }
  }
  const transactions = await TransactionModel.find(params)
  return transactions
}


export const getTransactionsMeta = async (email: string) => {
  const res = await TransactionModel.aggregate([ {$match: {'email': email}}, {$group: { _id: {year: {$year: "$time" }, month: {$month: "$time"}}}}])
    return (await res).map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
}
// export const getTransactionById = async (transactionId: number) => {
//   const sqlQuery = `SELECT * FROM public.transactions WHERE id = $1`;
//   const result = await query(sqlQuery, [transactionId]);
//   return result['length'] === 0 ? null : result[0];
// };

export const getTransactionById = async (transactionId: string) => {
  const transactionById = await TransactionModel.findById(transactionId)
  return transactionById;
};

// export const deleteTransactionById = async (transactionId: number) => {
//   const sqlQuery = `DELETE FROM public.transactions WHERE id = $1`;
//   await query(sqlQuery, [transactionId]);
// };

export const deleteTransactionById = async (transactionId: string) => {
  const deleteTransaction = await TransactionModel.findByIdAndDelete(transactionId)
  return deleteTransaction;
};

// export const getTransactionsMeta = async (email: string) => {
//   const sqlQuery = `SELECT
//                       EXTRACT(year from time) as year,
//                       EXTRACT(month from time) as month
//                     FROM
//                       (SELECT * FROM transactions WHERE email = $1 AND status = 0) as nested
//                     GROUP BY EXTRACT(month from time), EXTRACT(year from time)
//                     ORDER BY year, month`;
//   const res: any = await query(sqlQuery, [email]);
//   return res.map(meta => ({ year: Number(meta.year), month: Number(meta.month) }));
// };


export const addTransaction = async (transaktion: TransactionType) => {
  const transaction = new TransactionModel(transaktion)
  await transaction.save()
  return transaction
}

// export const addTransaction = (transaction: TransactionType) => {
//   return query(
//     'INSERT INTO public.transactions(email, "time", amount, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//     [
//       transaction.email,
//       transaction.time,
//       transaction.amount,
//       transaction.description,
//       TransactionStatus.Final
//     ]
//   ).then((res) => res);
// };

// export const filterOutExistingTransactions = async (transactions: TransactionType[]): Promise<TransactionType[]> => {
//   if (transactions.length === 0) {
//     return [];
//   }
//   const sqlQuery = `SELECT source_reference FROM "transactions" WHERE source_reference in (${transactions.map((transaction, index) => "$" + (index + 1)).join(", ")})`;
//   const params = transactions.map(transaction => transaction.sourceReference);
//   const existingTransactionSourceReferences = (await query(sqlQuery, params) as any[])
//     .map(existingTransaction => existingTransaction.source_reference);
//   return transactions.filter(transaction => existingTransactionSourceReferences.indexOf(transaction.sourceReference) === -1);
// }