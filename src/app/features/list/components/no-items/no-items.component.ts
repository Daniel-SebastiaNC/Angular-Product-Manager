import { Component } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-no-items',
  standalone: true,
  imports: [MatCard, MatCardContent],
  templateUrl: './no-items.component.html',
  styleUrl: './no-items.component.scss'
})
export class NoItemsComponent {

}
