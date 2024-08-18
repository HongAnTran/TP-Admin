// import { AxiosError, AxiosResponse } from "axios";
import client from "@/api/axios";
// import { Params } from "@/types/common";
class ServiceAPI {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  async getAll<t>(params?: any): Promise<t> {
    try {
      return (await client.get(this.url, { params })).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getOne<t>(id: string | number, urlBase?: string): Promise<t> {

    try {
      return (await client.get(`${this.url}/${urlBase ? urlBase + "/" : ""}${id}`)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async add<t>(data: any): Promise<t> {
    try {
      return (await client.post(`${this.url}`, data)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async put<t>(id: string | number, data: any): Promise<t> {
    try {
      return (await client.patch(`${this.url}/${id}`, data)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch<t>(id: string | number, data: any): Promise<t> {
    try {
      return (await client.put(`${this.url}/${id}`, data)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async delete(id: string | number) {
    try {
      return (await client.delete(`${this.url}/${id}`)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteMany(ids: string) {
    try {
      return (await client.post(`${this.url}/delete/many?ids=${ids}`)).data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ServiceAPI;
