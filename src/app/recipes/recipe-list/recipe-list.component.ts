import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(private recipeService: RecipeService) { }

  /*@Output()
  selectedRecipe = new EventEmitter<Recipe>();*/

  recipes: Recipe[]=[];

  subscription: Subscription;

  /*recipes: Recipe[]=[
    new Recipe("recipe 1", "this is first","https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg"),
    new Recipe("recipe 2", "this is first","https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg")
  ];*/

  ngOnInit(): void {

    this.subscription = this.recipeService.recipeChanges.subscribe((recipe: Recipe[]) => {
      this.recipes = recipe;
    });

    this.recipes = this.recipeService.getRecipe();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  /*onRecipeSelected(recipe: Recipe){
    this.selectedRecipe.emit(recipe);
  }*/

}
