import { Routes } from "@angular/router";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductsFormComponent } from "./components/products-form/products-form.component";

export const PRODUCT_ROUTES: Routes = [
    {path:"", component: ProductsListComponent},
    {path:"new", component: ProductsFormComponent},
    {path:"edit/:id", component: ProductsFormComponent}
];