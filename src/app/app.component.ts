import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsFormComponent } from "./products/components/products-form/products-form.component";
import { ProductsListComponent } from "./products/components/products-list/products-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrudProductsFront';
}
