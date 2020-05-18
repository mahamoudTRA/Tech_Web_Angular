import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { DetailTodoComponent } from './detail-todo/detail-todo.component';
import { HomeComponent } from './home/home.component';
import { TodoService } from './services/todo.service';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListTodosComponent,
    DetailTodoComponent,
    HomeComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
