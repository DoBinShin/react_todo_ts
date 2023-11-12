import axios from "axios";

const instance = axios.create({
    baseURL: "https://jmxfbmxnz9.execute-api.ap-northeast-2.amazonaws.com/todos",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;