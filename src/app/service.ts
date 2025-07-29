// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart_list: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const cart = localStorage.getItem('cart_list') ?? '[]';
    this.cart_list = JSON.parse(cart);
    this.cartSubject.next(this.cart_list);
    console.log('CartService loaded cart_list:', this.cart_list); // Debug
  }

  getCart(): any[] {
    return this.cart_list;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: any): void {
    this.cart_list.push(item);
    this.saveCart();
    this.cartSubject.next(this.cart_list);
    console.log('CartService after addToCart:', this.cart_list); // Debug
  }

  cancelItem(index: number): void {
    if (index >= 0 && index < this.cart_list.length) {
      this.cart_list.splice(index, 1);
      this.saveCart();
      this.cartSubject.next(this.cart_list);
    }
  }

  increaseQty(index: number): void {
    if (index >= 0 && index < this.cart_list.length) {
      this.cart_list[index].quantity =
        (this.cart_list[index].quantity || 1) + 1;
      this.saveCart();
      this.cartSubject.next(this.cart_list);
    }
  }

  decreaseQty(index: number): void {
    if (index >= 0 && index < this.cart_list.length) {
      const currentQty = this.cart_list[index].quantity || 1;
      if (currentQty > 1) {
        this.cart_list[index].quantity = currentQty - 1;
        this.saveCart();
        this.cartSubject.next(this.cart_list);
      }
    }
  }

  setQty(index: number, qty: number): void {
    if (index >= 0 && index < this.cart_list.length && qty >= 1) {
      this.cart_list[index].quantity = qty;
      this.saveCart();
      this.cartSubject.next(this.cart_list);
    }
  }
  clearCart(): void {
    this.cart_list = [];
    this.saveCart();
    this.cartSubject.next(this.cart_list);
    console.log('CartService cleared cart_list:', this.cart_list);
  }

  private saveCart(): void {
    localStorage.setItem('cart_list', JSON.stringify(this.cart_list));
    console.log('CartService saved cart_list:', this.cart_list); // Debug
  }
}
