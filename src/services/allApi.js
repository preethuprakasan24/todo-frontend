import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


export const addTaskApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/alltask`, reqBody, "")
}

//get task
export const getAllTaskApi = async()=>{
    return await commonApi('GET', `${serverUrl}/alltask`, "" ,"")
}

//delete task
export const deleteTaskApi = async(id)=>{
    return await commonApi('DELETE', `${serverUrl}/alltask/${id}`,{},"")
}

//edit task
export const editTaskApi = async(id, reqBody)=>{
    return await commonApi('PUT', `${serverUrl}/alltask/${id}`, reqBody,"")
}