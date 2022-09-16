import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './model/products';
import { ProductService } from './service/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-http';

  allProducts: Product[] = [];
  isFetching: boolean = false;
  editMode: boolean = false;
  currentProductId: string;

  @ViewChild('productsForm') form: NgForm;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProduct();
  }
  onProductsFetch() {
    this.fetchProduct();
  }

  onProductCreate(products: { pName: string; desc: string; price: string }) {
    if (!this.editMode) this.productService.createProduct(products);
    else this.productService.updateProduct(this.currentProductId, products);
  }

  private fetchProduct() {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    });
  }

  onEditClicked(id: string) {
    this.currentProductId = id;
    // Get the product based on the id
    let currentProduct = this.allProducts.find((p) => {
      return p.id === id;
    });
    //console.log(currentProduct);
    //console.log(this.form);

    //Populate the form with the product details
    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price,
    });
    //Change the button value to update product
    this.editMode = true;
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
  onDeleteAllProduct() {
    this.productService.deleteAllProduct();
  }
}
