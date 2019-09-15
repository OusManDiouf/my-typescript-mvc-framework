import axios, { AxiosPromise } from "axios";
interface HasID {
  id?: number;
}
export class ApiSync<T extends HasID> {
  constructor(private rootURL: string) {}

  fetch(id: number): AxiosPromise<T> {
    return axios.get(`${this.rootURL}/${id}`);
  }
  save(data: T): AxiosPromise<T> {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootURL}/${id}`, data);
    } else {
      return axios.post(this.rootURL, data);
    }
  }
}
