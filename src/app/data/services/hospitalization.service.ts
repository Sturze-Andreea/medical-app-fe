import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospitalization } from '../models/hospitalization.model';
import { apiPath } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class HospitalizationService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = `${apiPath}/hospitalizations`;
  formData: Hospitalization = new Hospitalization();
  list: Hospitalization[];

  refreshList() {
    this.httpClient
      .get(this.baseURL)
      .toPromise()
      .then((res) => (this.list = res as Hospitalization[]));
  }

  add() {
    return this.httpClient.post(this.baseURL, this.formData);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  edit() {
    return this.httpClient.put(
      `${this.baseURL}/${this.formData.hospitalizationId}`,
      this.formData
    );
  }

  getById(id:number){
    return this.httpClient.get(`${this.baseURL}/${id}`);
}
}
