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
  }

  getCart(): any[] {
    return this.cart_list;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: any): void {
    const existingItem = this.cart_list.find((p) => p.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart_list.push({ ...item, quantity: 1 });
    }

    this.saveCart();
    this.cartSubject.next(this.cart_list);
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
    const item = this.cart_list[index];
    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
      this.cart_list.splice(index, 1); // remove item from cart
    }

    this.saveCart();
    this.cartSubject.next(this.cart_list);
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
  }

  private saveCart(): void {
    localStorage.setItem('cart_list', JSON.stringify(this.cart_list));
  }
}
