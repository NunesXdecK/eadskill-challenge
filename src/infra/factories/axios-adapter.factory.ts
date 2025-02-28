import axios from "axios";
import { AxiosHttpService } from "../http/axios.adapter";
import { CategoryRepository } from "@/core/domain/interfaces/category-repository.inteface";

export default class AxiosAdapterFactory {
  static create(): AxiosHttpService {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_PRODUCTS_API,
    });
    return new AxiosHttpService(instance);
  }
}
