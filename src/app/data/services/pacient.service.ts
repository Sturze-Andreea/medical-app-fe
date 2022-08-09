import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacient } from '../models/pacient.model';
import { apiPath } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PacientService {
    constructor(private httpClient: HttpClient) {
    }

    readonly baseURL= `${apiPath}/patients`;
    formData: Pacient = new Pacient();
    list:Pacient[];

    refreshList(){
        return this.httpClient.get(this.baseURL)
    }

    add(){
        return this.httpClient.post(this.baseURL, this.formData);
    }

    delete(id: number){
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    edit(){
        return this.httpClient.put(`${this.baseURL}/${this.formData.pacientId}`, this.formData);
    }

    getById(id:number){
        return this.httpClient.get(`${this.baseURL}/${id}`);
    }
    
}
