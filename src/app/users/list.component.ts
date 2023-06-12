import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';

@Component({ templateUrl: 'list.component.html',styleUrls: ['list.component.css'], })
export class ListComponent implements OnInit {
    users?: any[];
    userArray: any[]=[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
            
    }

    deleteUser() {
        if(this.userArray){
            for(let i=0;i<this.userArray.length;i++){
            this.accountService.delete(this.userArray[i])
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== this.userArray[i]));
            }
        }
        
    }
    check(id,isChecked){
        console.log("users",this.users)
        if(isChecked) {
            this.userArray.push(id);
          } else {
            let index = this.userArray.indexOf(id);
            this.userArray.splice(index,1);
          }
    }
}