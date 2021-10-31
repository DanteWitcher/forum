import { Observable } from "rxjs";
import HttpsService from "./HttpService";
import HttpService from "./HttpService";

export default class AuthService {
    static uri = `${HttpsService.host}/auth`;

    static login(email, password): Observable<any> {
        const url = AuthService.uri + '/login';

        return HttpService.post(url, { email, password });
    }

    static register(email, password): Observable<any> {
        const url = AuthService.uri + '/register';

        return HttpService.post(url, { email, password });
    }
}
