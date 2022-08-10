import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacientData } from '../models/pacientData.model';
import { apiPath } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PacientDataService {
    constructor(private httpClient: HttpClient) {
    }

    readonly baseURL= `${apiPath}`;
    formData: PacientData = new PacientData();
    list:PacientData[];

    refreshList(){
        this.httpClient.get(this.baseURL)
        .toPromise()
        .then(res => this.list = res as PacientData[])
    }

    add(){
        return this.httpClient.post(this.baseURL, this.formData);
    }

    delete(id: number){
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    edit(){
        return this.httpClient.put(`${this.baseURL}/${this.formData.PacientDataId}`, this.formData);
    }
    
}
