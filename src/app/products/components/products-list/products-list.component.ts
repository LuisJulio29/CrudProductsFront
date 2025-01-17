import { Component , inject ,OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../interfaces/products';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-products-list',
  imports: [CommonModule,MatPaginatorModule, MatTableModule,MatPaginator,MatButtonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  private productService = inject(ProductService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: WritableSignal<Product[]> = signal<Product[]>([]);

  displayedColumns: string[] = ['id', 'name', 'description', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit():void {
    this.loadProducts();
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

  loadProducts(){
    this.productService.getProducts().subscribe({
      next:(products) => {
        this.products.set(products);
        this.updateTable();
      }
    })

  }

  updateTable(){
    this.dataSource.data = this.products();
    this.dataSource.paginator = this.paginator;
  }
  navigateToForm(id?:number){

  }

  deleteProduct(id?:number){

  }
}
