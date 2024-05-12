import axios from "axios";

export default axios.create({
    baseURL: 'https://c046-2600-1700-38d4-1490-d08-b0b7-2014-75e4.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});