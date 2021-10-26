import HttpsService from "./HttpService";
import HttpService from "./HttpService";

export default class AuthService {
    static async login(email, password) {
        const url = HttpsService.host + '/login';

        return HttpService.post(url, { email, password });
    }

    static async register(email, password) {
        const url = HttpsService.host + '/register';

        HttpService.post(url, { email, password })
    }
}
