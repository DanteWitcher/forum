import { Observable, pluck } from "rxjs";
import HttpsService from "./HttpService";

export default class ProfileService {
	static uri = `${HttpsService.host}/profile`;

    static getProfile(): Observable<any> {
        return HttpsService.get(this.uri).pipe(pluck('data'));
    }

	static getProfiles(): Observable<any> {
		const path = `${this.uri}/profiles`;

        return HttpsService.get(path).pipe(pluck('data'));
    }

    static createProfile(data: any): Observable<any> {
		const path = `${this.uri}/create`;

		// TODO: move to backend
		if ('id' in data) {
			delete data.id;
		}
		
		return HttpsService.post(path, data);
    }

	static editProfile(data: any): Observable<any> {
		const path = `${this.uri}/update`;

		return HttpsService.patch(path, data);
    }

	static deleteProfile(path: string, data: any): Observable<any> {
		return HttpsService.delete(path, data);
    }

	static checkNickName(nickName: string) {
		const path = `${this.uri}/check-name`;

		return HttpsService.post(path, { nickName: nickName.trim() });
	}
}
