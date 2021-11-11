import { catchError, map, Observable, of } from "rxjs";
import { EErrors } from "../shared/enums/errors.enum";
import HttpsService from "./HttpService";

export default class ProfileService {
	static uri = `${HttpsService.host}/profile`;

    static getProfile(): Observable<any> {
        return HttpsService.get(this.uri).pipe(
			// TODO: mb rework on back end, just getting null obj if no profile
			catchError((err) => {
				const data = err.response.data;
				if (data.errCode === EErrors.PROFILE_NOT_CREATED) {
					return of(null);
				}

				throw err;
			}),
		);
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

	static editProfile(data: any): Observable<any> {
		const path = `${this.uri}/update`;

		return HttpsService.patch(path, data);
    }

	static deleteProfile(path: string, data: any): Observable<any> {
		return HttpsService.delete(path, data);
    }
}
