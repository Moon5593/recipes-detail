import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  /*@ViewChild('nameInput')
  name: ElementRef;

  @ViewChild('amountInput')
  amount: ElementRef;*/

  /*@Output()
  emitData = new EventEmitter<Ingredient>();*/

  @ViewChild('f') form: NgForm;
  allowEdit: boolean = false;
  index: number;
  getIngredientByIndex: Ingredient;
  emitList: Ingredient;

  subscription: Subscription;

  ngOnInit(): void {

  this.subscription = this.shoppingListService.index.subscribe((index: number) => {
    this.allowEdit = true;
    this.index = index;
    this.getIngredientByIndex = this.shoppingListService.getIngredient(index);
    this.form.setValue({
      'name': this.getIngredientByIndex.name,
      'amount': this.getIngredientByIndex.amount
    });
  });

  }

  onAdd(form: NgForm){

    const value = form.value;
    this.emitList = new Ingredient(value.name, value.amount);
    //this.emitList = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);

    if(this.allowEdit){
      this.shoppingListService.updateIngredient(this.index, this.emitList);
      this.allowEdit = false;
      this.form.reset();
    }
    else{
      this.shoppingListService.addIngredient(this.emitList);
      this.form.reset();
    }

  }

  onClear(){
    this.allowEdit = false;
    this.form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
