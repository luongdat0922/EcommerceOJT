import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];
  roles: string[] = [];
  isAdmin = false;

  constructor(private productService: ProductService,
    private storageService: StorageService) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.roles = this.storageService.getUser().roles;
      if (this.roles.some(item => item.includes('ROLE_MODERATOR')) || this.roles.some(item => item.includes('ROLE_ADMIN'))) {
        this.isAdmin = true;
      }
    }
    console.log(this.isAdmin);
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }

}
