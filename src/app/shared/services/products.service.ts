import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { ProductPayload } from '../interfaces/playload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient)

  getAll() : Observable<Product[]> {
    return this.httpClient.get<Product[]>("/api/products")
  }

  get(id: string) : Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${id}`)
  }

  post(playload: ProductPayload) {
    return this.httpClient.post("/api/products", playload)
  }

  put(id: string, playload: ProductPayload) {{
    return this.httpClient.put(`/api/products/${id}`, playload)
  }}

  delete(id: string) {
    return this.httpClient.delete(`/api/products/${id}`)
  }

}
