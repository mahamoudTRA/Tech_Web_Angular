import { Component } from '@angular/core';
import { Todo } from '../modele/todo';
import { OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

import { TODOS } from '../mock-todos';

@Component({
  selector: 'list-component',
  templateUrl: './list-todos.component.html',
})
export class ListTodosComponent implements OnInit{
  title = 'Todos';
  todos: Todo[] = null;

  constructor(
    private router: Router, 
    private todoService: TodoService) {  }

  ngOnInit(): void {
    //this.todos = TODOS;
    //this.getTodos()
    this.getTodos2();
  }

  getTodos2(){
    this.todoService.getTodos().subscribe(
      (data: Array<Todo>) => {
        this.todos = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur :'+error.statusText + ' - ' + error.message);
      },
      () => {
        console.log('Done.');
      }
    );
  }


  getTodos(): void {
		this.todoService.getTodos()
			.subscribe(todos => this.todos = todos);
	}

  selectTodo(todo: Todo){
    let link = ['/todo', todo.id];
        this.router.navigate(link);
  }


}
