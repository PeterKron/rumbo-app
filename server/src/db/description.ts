// import { query } from "./db";
import { TransactionModel } from "./models/models";

// export const getDescriptionsByEmail = async (email: string) => {
//     const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
//     return await query(sqlQuery, [ email ]);
// };

export const getDescriptionsByEmail = async (email: string) => {
    const descriptions = await TransactionModel.find({email: email})
    return descriptions
};