import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { EMPTY, map, mergeMap, withLatestFrom } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { selectCategories } from "./categories.selector";
import { categoriesFetchAPISuccess, invokCategoriesAPI } from "./categories.action";
import { Appstate } from "src/app/shared/store/appstate";

@Injectable()
export class CategoriesEffect {

    constructor(
        private actions$: Actions,
        private categoriesService: CategoryService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokCategoriesAPI),
      withLatestFrom(this.store.pipe(select(selectCategories))),
      mergeMap(([, bookformStore]) => {
        if (bookformStore.length > 0) {
          return EMPTY;
        }
        return this.categoriesService
          .getCategories()
          .pipe(map((data) => categoriesFetchAPISuccess({ allCategories: data })));
      })
    )

    
  );
}
