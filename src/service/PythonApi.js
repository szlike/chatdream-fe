import axios from 'axios'



const fetchConversationResp = (payload)=>{
    return axios.post('https://m3arspb0fb.execute-api.us-east-1.amazonaws.com/prod/pythonAIResource', payload)
    .then((res)=>res)
    .catch((err)=>err)
}

export {
    fetchConversationResp
}

