
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{

    ingredientsChanges = new Subject<Ingredient[]>();

    index = new Subject<number>();

    private ingredients: Ingredient[]=[
        new Ingredient("banana", 5),
        new Ingredient("orange", 5)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanges.next(this.ingredients.slice());
      }

      addToIngredients(ingredients : Ingredient[]){
        /*for(let i of ingredients){
            this.ingredients.push(i);
        }*/
        this.ingredients.push(...ingredients);
        this.ingredientsChanges.next(this.ingredients.slice());
      }

      updateIngredient(index: number, ingredient: Ingredient){
          this.ingredients[index] = ingredient;
          this.ingredientsChanges.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanges.next(this.ingredients.slice());
      }

}