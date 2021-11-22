import { Observable } from "rxjs";
import HttpsService from "./HttpService";

export default class FilesService {
	static uri = `${HttpsService.host}/files`;

    static uploadFile(file: any): Observable<any> {
		const path = `${this.uri}/upload-profile-photo`;
		const formData = new FormData();
    	formData.append("file", file);

        return HttpsService.post(path, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
    }
}
