import { get } from "../utils/request";

export const getQuestionTopic = async (topicId)=>{
    const result = await get(`question?topicId=${topicId}`);
    return result;
};
