import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  /*ingredients:Ingredient[]=[
    new Ingredient("banana", 5),
    new Ingredient("orange", 5)
  ];*/

  ingredients: Ingredient[] = [];

  subs: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subs = this.shoppingListService.ingredientsChanges.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients;}
    );
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  getIndex(i: number){
    this.shoppingListService.index.next(i);
  }

  /*toAdd(data){
    this.shoppingListService.emitData.subscribe(
      (ingredient: Ingredient) => {this.ingredients.push(ingredient);}
    );
  }*/

}
