import { BehaviorSubject, Observable, of, switchMap, tap, timer } from "rxjs";
import { decodeTokenToObj, decodeTokenToString } from "../../shared/helpers/decode-token";
import { ITokenData } from "../../shared/interfaces/token-data.interface";
import CONFIG from "../config";
import HttpsService from "./HttpService";
import HttpService from "./HttpService";

export default class AuthService {
	static isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    static uri = `${HttpsService.host}/auth`;
    static reLoginTimer = null;

    static login(email, password): Observable<any> {
        const url = this.uri + '/login';

        return HttpService.post(url, { email, password }).pipe(
            tap(({ data }: any) => {
                const tokenData = decodeTokenToObj(data.access_token);
                
                this.startLoginTimer(tokenData);
                localStorage.setItem(CONFIG.LS_USER_KEY, decodeTokenToString(data.access_token));

                return this.isLogin$.next(true);
            }),
        );
    }

    static reLogin(email): Observable<any> {
        const url = this.uri + '/get-token';

        return HttpService.post(url, { email, password: 'Qwerty10!' }).pipe(
            tap(({ data }: any) => {
                const tokenData = decodeTokenToObj(data.access_token);
                
                this.startLoginTimer(tokenData);
                localStorage.setItem(CONFIG.LS_USER_KEY, decodeTokenToString(data.access_token));

                return this.isLogin$.next(true);
            }),
        );
    }

    static register(email, password): Observable<any> {
        const url = this.uri + '/register';

        if (CONFIG.IS_MOCK) {
            return timer(500).pipe(switchMap(() => of({})));
        }

        return HttpService.post(url, { email, password });
    }

    static checkToken(): Observable<null> {
        if (this.isTokenExpired()) {
            this.isLogin$.next(false);
            return of(null);
        }

        const tokenData: ITokenData = JSON.parse(localStorage.getItem(CONFIG.LS_USER_KEY));
        this.startLoginTimer(tokenData);
        this.isLogin$.next(true);

        return of(null);
    }


    static isTokenExpired(): boolean {
        const tokenData: ITokenData = JSON.parse(localStorage.getItem(CONFIG.LS_USER_KEY));

        tokenData && console.log('TOKEN TIME=', tokenData.exp * 1000, 'NOW TIME=', Date.now());

        return tokenData ? (Date.now()) >= (tokenData.exp * 1000 + CONFIG.RE_LOGIN_TIME) : true;
    }

    static startLoginTimer(tokenData: ITokenData) {
        if (this.reLoginTimer) {
            clearTimeout(this.reLoginTimer);
        }

        const reLoginTime = ((Number(tokenData.exp) * 1000) - Date.now() - CONFIG.RE_LOGIN_TIME);
        this.reLoginTimer = setTimeout(() => this.reLogin(tokenData.email), reLoginTime);
    }
}
