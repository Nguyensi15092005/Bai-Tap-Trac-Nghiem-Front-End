import {get} from "../utils/request"

export const getListTopic = async ()=>{
    const result = await get("topic");
    return result;
};

export const getTopic = async (id)=>{
    const result = await get(`topic/${id}`);
    return result;
};