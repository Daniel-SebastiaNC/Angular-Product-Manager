import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { inject } from '@angular/core';

export const getProduct = (
  route: ActivatedRouteSnapshot,
) => {
  const productsService = inject(ProductsService);

  return productsService.get(route.paramMap.get('id') as string);
};
