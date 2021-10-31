import axios from "axios";
import { from, Observable } from "rxjs";
import CONFIG from "./config";

export default class HttpsService {
    static host = `${CONFIG.HOST}:${CONFIG.PORT}`;

    static get(path: string, data: any): Observable<any> {
        return from(axios.get(path, data));
    }

    static post(path: string, data: any): Observable<any> {
        return from(axios.post(path, data));    
    }
}
