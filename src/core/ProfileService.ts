import { Observable } from "rxjs";
import HttpsService from "./HttpService";

export default class ProfileService {
	static uri = `${HttpsService.host}/profile`;

    static getProfile(): Observable<any> {
        return HttpsService.get(this.uri);
    }

    static createProfile(data: any): Observable<any> {
		const path = `${this.uri}/create`;

		// TODO: rework it!
		if (!data.phone) {
			delete data.phone; 
		}

		if (!data.photoUrl) {
			delete data.photoUrl; 
		}
		
		return HttpsService.post(path, data);
    }

	static editProfile(path: string, data: any): Observable<any> {
		return HttpsService.patch(path, data);
    }

	static deleteProfile(path: string, data: any): Observable<any> {
		return HttpsService.delete(path, data);
    }
}
