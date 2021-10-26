import axios from "axios";
import CONFIG from "./config";

export default class HttpsService {
    static host = `${CONFIG.HOST}:${CONFIG.PORT}`;

    static async get(path: string, data: any) {
        return axios.get(path, data);
    }

    static async post(path: string, data: any) {
        return axios.post(path, data);    
    }
}
