import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppDataService } from '../shared/app-data.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private ds: AppDataService, private rs: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        const recipes = this.rs.getRecipe();
        if(recipes.length === 0){
            return this.ds.fetchRecipes();
        }else{
            return recipes;
        }

    }
}