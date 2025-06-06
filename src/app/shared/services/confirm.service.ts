import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  matDialog = inject(MatDialog);

  openDiolog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmDelete)
      .afterClosed();
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
