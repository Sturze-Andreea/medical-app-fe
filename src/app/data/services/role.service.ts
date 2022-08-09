import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { apiPath } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private httpClient: HttpClient) {
    }

    readonly baseURL=  `${apiPath}/roles`;
    formData: Role = new Role();
    list:Role[];

    refreshList(){
        this.httpClient.get(this.baseURL)
        .toPromise()
        .then(res => this.list = res as Role[])
    }

    add(){
        return this.httpClient.post(this.baseURL, this.formData);
    }

    delete(id: number){
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

    edit(){
        return this.httpClient.put(`${this.baseURL}/${this.formData.roleId}`, this.formData);
    }
    
}
