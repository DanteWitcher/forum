import { BehaviorSubject, Observable, of, switchMap, tap, timer } from "rxjs";
import HttpsService from "./HttpService";
import HttpService from "./HttpService";

export default class AuthService {
	static isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(null);

    static uri = `${HttpsService.host}/auth`;

    static login(email, password): Observable<any> {
        const url = AuthService.uri + '/login';

        return HttpService.post(url, { email, password });
    }

    static register(email, password): Observable<any> {
        const url = AuthService.uri + '/register';

		return timer(500).pipe(switchMap(() => of({}))).pipe(
			tap(() => this.isLogged$.next(true)),
		);

        return HttpService.post(url, { email, password });
    }
}
