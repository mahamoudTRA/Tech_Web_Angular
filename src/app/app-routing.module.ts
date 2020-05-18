import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { DetailTodoComponent } from './detail-todo/detail-todo.component';
import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

const appRoutes: Routes = [
  { path: 'todos', component: ListTodosComponent },
  { path: 'todo/:id', component: DetailTodoComponent },
  { path: 'home', component: HomeComponent},
  { path: 'todos/add', component: AddTodoComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
