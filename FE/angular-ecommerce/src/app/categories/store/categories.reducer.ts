import { createReducer, on } from "@ngrx/store";
import { ProductCategory } from "src/app/common/product-category";
import { categoriesFetchAPISuccess } from "./categories.action";

export const initialState: ReadonlyArray<ProductCategory> = [];

export const categoryReducer = createReducer(
    initialState,
    on(categoriesFetchAPISuccess, (state, { allCategories }) => {
        return allCategories;
    })
)