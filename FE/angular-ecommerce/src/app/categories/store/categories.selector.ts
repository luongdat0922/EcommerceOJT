import { createFeatureSelector } from "@ngrx/store";
import { ProductCategory } from "src/app/common/product-category";

export const selectCategories = createFeatureSelector<ProductCategory[]>('myCategories');
