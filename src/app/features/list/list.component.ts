import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product[] = [];

  productService = inject(ProductsService);
  router = inject(Router);

  ngOnInit(){
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit', product.id])
  }

}
