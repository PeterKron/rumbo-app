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

export const getTransactionById = async (transactionId: string) => {
  const transactionById = await TransactionModel.findById(transactionId)
  return transactionById;
};

export const deleteTransactionById = async (transactionId: string) => {
  const deleteTransaction = await TransactionModel.findByIdAndDelete(transactionId)
  return deleteTransaction;
};

export const addTransaction = async (transaktion: TransactionType) => {
  const transaction = new TransactionModel(transaktion)
  await transaction.save()
  return transaction
}

