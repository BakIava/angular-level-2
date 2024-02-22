import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Model } from "./model/Model";
import { Option } from "./model/Option";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getModels() {
        return firstValueFrom(this.http.get<Model[]>('models'));
    }

    getOptions(code: string) {
        return firstValueFrom(this.http.get<Option>(`options/${code}`));
    }
}