import axios, { AxiosRequestConfig } from "axios";
import { from, Observable } from "rxjs";
import CONFIG from "./config";

export default class HttpsService {
    static host = `${CONFIG.HOST}:${CONFIG.PORT}`;

    static get(path: string): Observable<any> {
        return from(axios.get(path, { withCredentials: true }));
    }

    static post(path: string, data: any, config?: AxiosRequestConfig): Observable<any> {
        return from(axios.post(path, data, { ...config, withCredentials: true }));    
    }

	static patch(path: string, data: any): Observable<any> {
        return from(axios.patch(path, data, { withCredentials: true }));
    }

    static delete(path: string, data: any): Observable<any> {
        return from(axios.delete(path, { data, withCredentials: true }));    
    }
}
