import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Todo } from '../modele/todo';
import { environment } from 'src/environments/environment';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'ionis-group': 'B'
  })
};
@Injectable({
  providedIn: 'root'
})

export class TodoService {

  
  todoPath: string = 'todos';
  
  private todoUrl = 'http://9044af4c-8a85-430f-9436-f2908a508b0b.pub.cloud.scaleway.com/todos-management/rest/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    const httpOptions = {
			headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'ionis-group': 'B',
        'Access-Control-Allow-Origin': '*' })
		};
   
    return this.http.get<Todo[]>(this.todoUrl, httpOptions)
      .pipe(
			tap(_ => this.log(`fetched todos`)),
			catchError(this.handleError('getTodos', []))
		);
	}

  getTodos2(){
    return this.http
                .get<Array<Todo>>(this.todoUrl,
                  { headers: {'Content-Type': 'application/json',
                              'ionis-group': environment.groupeName}
                  })
                .pipe(
                  catchError(this.handleError)
                );
  }

  getTodoByID(id: number): Observable<Todo> {

    const httpOptions = {
			headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'ionis-group': 'B',
        'Access-Control-Allow-Origin': '*' })
		};

		const url = `${this.todoUrl}/${id}`;

		return this.http.get<Todo>(url, httpOptions).pipe(
			tap(_ => this.log(`fetched todo id=${id}`)),
			catchError(this.handleError<Todo>(`getTodo id=${id}`))
		);
  }
  
  addTodo(t: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, t, httpOptions).pipe(
      tap((c: Todo) => console.log(`added todo w/ id=${c.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  updateTodo(id : number, todo: Todo): Observable<Todo> {
    //todo.id = id; console.log(todo);
    const url = `${this.todoUrl}/${id}`;
    return this.http.put<Todo>(url, todo, httpOptions).pipe(
      tap(_ => console.log(`update todo id=${id}`)),
      catchError(this.handleError<Todo>('updateTodo'))
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  private log(log: string) {
		console.info(log);
	}

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

}
