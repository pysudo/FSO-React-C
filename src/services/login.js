import axios from "axios";


const baseURL = "/api/login";


const login = async crendentials => {
    const response = await axios.post(baseURL, crendentials);
    return response.data;
};

const exports = { login };
export default exports;