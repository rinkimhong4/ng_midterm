import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { AppFooter } from './app-footer/app-footer';
import { CartService } from './service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [CartService],
})
export class App {
  Number(arg0: string) {
    throw new Error('Method not implemented.');
  }
  protected title = 'ng_final';
}
