// import { query } from "./db";
import { SettingModel } from "./models/models";


export type Setting = {
  _id: string;
  key: string;
  value: string;
};

export const getSetting = async (key: string) => {
  const result = await SettingModel.find({key:key}) as Setting[]
  return result.length ? result[0].value : null; 
 }
 
 export const setSetting = async (key: string, value: string) => {
  const setting = new SettingModel(key, value)
  return await setting.save()
 }