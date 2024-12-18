 import { post } from "../utils/request";

export const redultQuizService = async (options)=>{
    const result = await post(`answers`, options);
    return result;
};