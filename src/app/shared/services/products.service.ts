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

  post(playload: ProductPayload) {
    return this.httpClient.post("/api/products", playload)
  }

}
