import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '../models/ward.model';

@Injectable({
    providedIn: 'root',
})
export class WardService {
    constructor(private httpClient: HttpClient) {
    }

    readonly baseURL= 'https://localhost:5001/Wards';
    formData: Ward = new Ward();
    list:Ward[];

    refreshList(){
        this.httpClient.get(this.baseURL)
        .toPromise()
        .then(res => this.list = res as Ward[])
    }

    add(){
        return this.httpClient.post(this.baseURL, this.formData);
    }

    delete(id: number){
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    edit(){
        return this.httpClient.put(`${this.baseURL}/${this.formData.wardId}`, this.formData);
    }
    
}
