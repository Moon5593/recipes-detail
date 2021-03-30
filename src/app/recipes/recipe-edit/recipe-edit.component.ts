import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isEditable: boolean = false;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private rs: RecipeService, private router: Router) { }

  ngOnInit(): void {

  this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.isEditable = params['id']!=null;
    this.initForm();
  });

  }

  addIngredient(){
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm(){

    let recipeName = '';
    let recipeUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.isEditable){
      const recipe = this.rs.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeUrl = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSave(){
    //console.log(this.form);

    /*const recipe = new Recipe(
      this.form.value['name'],
      this.form.value['imageUrl'],
      this.form.value['description'],
      this.form.value['ingredients']
    );*/

    if(this.isEditable){
      this.rs.updateRecipe(this.id, this.form.value);
    }else{
      this.rs.addRecipe(this.form.value);
    }

    this.onCancel();

  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() { // a getter!
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onDeleteIngredient(i: number){
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }

}
