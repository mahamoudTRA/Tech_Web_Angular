import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Todo } from '../modele/todo';
import { TODOS } from '../mock-todos';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';



@Component({
    selector: 'detail-todos',
    templateUrl: './detail-todo.component.html'
})
export class DetailTodoComponent implements OnInit {
  
    todo: Todo = null;
    id : number;
    titre: string;
    description: string;
    dateExecution: string;
    
    todoForm : FormGroup;
    constructor(private route: ActivatedRoute, fb: FormBuilder,
      private router: Router,
      private todoService: TodoService) {
        
        this.todoForm = new FormGroup({
          titre: new FormControl(''),
          description: new FormControl(''),
          dateExecution: new FormControl(''),
        });
       }
  
    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.getTodoById(this.id);
        this.todoService.getTodoByID(this.id) .subscribe(todo => this.todo = todo);
        
    }

    getTodoById(id: any) {
        this.todoService.getTodoByID(id).subscribe((todo: any) => {
          this.id = todo.id;
          this.todoForm.setValue({
            titre: todo.titre,
            description: todo.description,
            dateExecution: todo.dateExecution
          });
        });
      }

    goBack(): void {
        this.router.navigate(['/todos']);
        //window.history.back();
    }

    updateTodo(): void {
        console.warn(this.id);
        this.todoService.updateTodo(this.id, this.todoForm.value)
        .subscribe((res: any) => {
            this.router.navigate(['/todos']);
            }, (err: any) => {
            console.log(err);
            });
    }

    deleteTodo(id: number): void {
        this.todoService.deleteTodo(id)
            .subscribe(todo => this.todo = todo);
        this.router.navigate(['/todos']);
    }
  
}