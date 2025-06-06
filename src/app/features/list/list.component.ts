import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: Product[] = [];

  productService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmDelete)
      .afterClosed()
      .subscribe((answer: boolean) => {
        if (answer) {
          this.productService.delete(product.id).subscribe(() => {
            this.productService.getAll().subscribe((data) => {
              this.products = data;
            });
          });
        }
      });
  }
}

@Component({
  selector: 'app-confirm-delete',
  template: `
    <mat-dialog-content> Você quer deleter esse Produto? </mat-dialog-content>
    <mat-dialog-actions [align]="'end'">
      <button mat-button (click)="onNo()">Não</button>
      <button
        mat-raised-button
        (click)="onYes()"
        cdkFocusInitial
        color="primary"
      >
        Sim
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
})
export class ConfirmDelete {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}
