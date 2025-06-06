import { ConfirmService } from './../../shared/services/confirm.service';
import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { NoItemsComponent } from './components/no-items/no-items.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  );

  productService = inject(ProductsService);
  router = inject(Router);
  confirmService = inject(ConfirmService);

  onEdit(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  onDelete(product: Product) {
    this.confirmService
      .openDiolog()
      .pipe(filter((answer) => answer))
      .subscribe((answer: boolean) => {
        this.productService.delete(product.id).subscribe(() => {
          this.productService.getAll().subscribe((products) => {
            this.products.set(products);
          });
        });
      });
  }
}
