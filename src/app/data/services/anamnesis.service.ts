import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anamnesis } from '../models/anamnesis.model';
import { apiPath } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AnamnesisService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = `${apiPath}/anamnesis`;
  formData: Anamnesis = new Anamnesis();
  list: Anamnesis[];

  refreshList() {
    this.httpClient
      .get(this.baseURL)
      .toPromise()
      .then((res) => (this.list = res as Anamnesis[]));
  }

  add() {
    return this.httpClient.post(this.baseURL, this.formData);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  edit() {
    return this.httpClient.put(
      `${this.baseURL}/${this.formData.anamnesisId}`,
      this.formData
    );
  }

  getById(id: number) {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }
  getByHospitalizationId(id: number) {
    return this.httpClient.get(`${this.baseURL}/hospitalization/${id}`);
  }
}
