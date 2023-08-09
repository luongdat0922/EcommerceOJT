import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './store/categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffect } from './store/categories.effect';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    StoreModule.forFeature('myCategories', categoryReducer),
    EffectsModule.forFeature([CategoriesEffect])
  ]
})
export class CategoriesModule { }
