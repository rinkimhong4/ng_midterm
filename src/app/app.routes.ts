import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { ProductDetails } from './product-details/product-details';
import { Home } from './home/home';
import { Product } from './product/product';
import { PopProductComponent } from './pop-product/pop-product';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'product', component: Product },
  { path: 'product-details/:id', component: ProductDetails },
  { path: 'cart', component: PopProductComponent },
];
