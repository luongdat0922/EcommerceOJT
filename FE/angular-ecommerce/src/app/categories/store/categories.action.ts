import { createAction, props } from "@ngrx/store";
import { ProductCategory } from "src/app/common/product-category";

export const invokCategoriesAPI = createAction(
    '[Categories API] Invoke Categories Fetch API'
);

export const categoriesFetchAPISuccess = createAction(
    '[Categories API] Fetch API Success',
    props<{ allCategories: ProductCategory[] }>()
)

export const invokeSaveNewCategory = createAction(
    '[Categories API] Invoke save new category api',
    props<{ newCategory: ProductCategory }>()
)

export const saveNewCategoryAPISuccess = createAction(
    '[Categories API] save new category api success',
    props<{ newCategory: ProductCategory }>()
)
