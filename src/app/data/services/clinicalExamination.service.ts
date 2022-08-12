import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClinicalExamination } from '../models/clinicalExamination.model';
import { apiPath } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ClinicalExaminationService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = `${apiPath}/clinicalExamination`;
  formData: ClinicalExamination = new ClinicalExamination();
  list: ClinicalExamination[];

  refreshList() {
    this.httpClient
      .get(this.baseURL)
      .toPromise()
      .then((res) => (this.list = res as ClinicalExamination[]));
  }

  add() {
    return this.httpClient.post(this.baseURL, this.formData);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  edit() {
    return this.httpClient.put(
      `${this.baseURL}/${this.formData.clinicalExaminationId}`,
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
