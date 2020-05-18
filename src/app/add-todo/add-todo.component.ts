import { Component, OnInit } from '@angular/core';
import { Todo } from '../modele/todo';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

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
    
  }

  onSubmit() {
    console.warn(this.todoForm.value);
    this.todoService.addTodo(this.todoForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.router.navigate(['/todos']);
        }, (err: any) => {
          console.log(err);
        });
  }

  goBack(): void {
    this.router.navigate(['/todos']);
}
}
