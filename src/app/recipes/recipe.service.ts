import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    //recipeSelected = new Subject<Recipe>();
    
    recipeChanges = new Subject<Recipe[]>();

    constructor(private sls: ShoppingListService){}

    /*private recipes: Recipe[]=[
        new Recipe("Indian Fried Cabbage", "Awesome warming healthy dish :-)","https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg", [
            new Ingredient("Meat", 3),
            new Ingredient("Chilli", 1)
          ]),
        new Recipe("Indian Quinoa", "Easy to make, A great nutrition!","https://eathealthyeathappy.com/wp-content/uploads/2015/02/Indian_quinoa-2.jpg", [
            new Ingredient("Olive Oil", 3),
            new Ingredient("Garam Masala", 2)
          ])
      ];*/

    recipes: Recipe[] = [];
    
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanges.next(this.recipes.slice());
    }

    getRecipe(){
        return this.recipes.slice();
    }

    getRecipeById(id: number){
        return this.recipes[id];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.sls.addToIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanges.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanges.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanges.next(this.recipes.slice());
    }

}