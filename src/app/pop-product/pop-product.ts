// pop-product.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Subscription } from 'rxjs';
import { CartService } from '../service';

@Component({
  selector: 'app-pop-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pop-product.html',
  styleUrls: ['./pop-product.css'],
})
export class PopProductComponent implements OnInit, OnDestroy {
  cart_list: any[] = [];
  total: number = 0;
  breakpoint: number = 2;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService
      .getCartObservable()
      .subscribe((cart) => {
        this.cart_list = cart;
        this.calculateTotal();
        console.log('PopProductComponent cart_list:', this.cart_list);
        console.log('Total:', this.total); // Debug
      });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  cancelItem(index: number): void {
    this.cartService.cancelItem(index);
    this.calculateTotal();
    console.log('After cancel, cart_list:', this.cart_list);
  }

  increaseQty(index: number): void {
    this.cartService.increaseQty(index);
    this.calculateTotal();
    console.log('After increaseQty, cart_list:', this.cart_list);
  }

  decreaseQty(index: number): void {
    this.cartService.decreaseQty(index);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cart_list.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  }
  checkout(): void {
    if (this.cart_list.length === 0) {
      window.alert('Your cart is empty!');
      return;
    }
    window.alert('Checkout successful! Your order has been placed.');
    this.cartService.clearCart();
    this.calculateTotal();
    console.log('Checkout completed, cart_list:', this.cart_list);
    console.log('Total:', this.total);
  }
}
