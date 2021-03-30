import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppDataService } from '../shared/app-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    /*@Output() 
    selected = new EventEmitter<string>();
    
    onSelect(selected: string){
        this.selected.emit(selected);
    }*/

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private appData: AppDataService, private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onStore(){
        this.appData.storeRecipes();
    }

    onFetch(){
        this.appData.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
    
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}