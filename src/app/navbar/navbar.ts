import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopProductComponent } from '../pop-product/pop-product';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private dialog: MatDialog) {}
  openCart(): void {
    this.dialog.open(PopProductComponent, {
      width: '8000px',
    });
  }
}
