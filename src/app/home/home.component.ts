import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Todo } from '../modele/todo';
import { TODOS } from '../mock-todos';
  
@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent{

      constructor(private route: ActivatedRoute, private router: Router) {}
    title: string = "Dashboard";
}