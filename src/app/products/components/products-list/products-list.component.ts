import { Component , inject ,OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-products-list',
  imports: [ButtonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit():void {
    this.productService.getProducts().subscribe
    ({
      next:(response) => {
        console.log("API response ", response );
      },
      error:(error) => {
        console.error("Error getting products "+error);
      },
      complete:() => {

      }
    })
  }
}
