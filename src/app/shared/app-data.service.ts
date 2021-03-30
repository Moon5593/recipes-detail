import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { map, tap } from 'rxjs/operators'; 

@Injectable({
    providedIn: 'root'
})
export class AppDataService {
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipes-testapp-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipes => {
            if(!recipes){
                return;
            }
            return recipes.map(recipe => {
                console.log({...recipe});
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []  }
            })
        }),
        tap(recipes => {
            if(!recipes){
                return;
            }
            this.recipeService.setRecipes(recipes);
        }));
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipe();
            this.http.put('https://recipes-testapp-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(recipes => {
                if(!recipes){
                    return;
                }
                console.log(recipes);
            });
    }

}