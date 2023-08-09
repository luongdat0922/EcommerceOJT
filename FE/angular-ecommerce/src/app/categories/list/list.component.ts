import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCategories } from '../store/categories.selector';
import { invokCategoriesAPI } from '../store/categories.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private store: Store) {}

  categories$ = this.store.pipe(select(selectCategories));

  ngOnInit(): void {
    this.store.dispatch(invokCategoriesAPI());
  }

}
