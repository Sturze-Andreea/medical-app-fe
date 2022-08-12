import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Liquids } from '../models/liquids.model';
import { apiPath } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class LiquidsService {
    constructor(private httpClient: HttpClient) {
    }

    readonly baseURL= `${apiPath}/liquids`;
    formData: Liquids = new Liquids();
    list:Liquids[];

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
        return this.httpClient.put(`${this.baseURL}/${this.formData.liquidsId}`, this.formData);
    }

    getById(id:number){
        return this.httpClient.get(`${this.baseURL}/${id}`);
    }

    getAllByHospitalization(id:number){
        return this.httpClient.get(`${this.baseURL}/byHospitalization/${id}`);
    }
    
}
