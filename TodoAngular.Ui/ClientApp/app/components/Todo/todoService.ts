import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';  // debug
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TodoService {

  public todoList: Observable<Todo[]>;
  private _todoList: BehaviorSubject<Todo[]>;
  private baseUrl: string;
  private dataStore: {
    todoList: Todo[];
  };

  constructor(private http: Http) {
    this.baseUrl = '/api/';
    this.dataStore = { todoList: [] };
    this._todoList = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todoList = this._todoList.asObservable();
  }

  getAll() {
    this.http.get(`${this.baseUrl}GetAllTodos`)
      .map(response => response.json())
      .subscribe(data => {
        this.dataStore.todoList = data;
        this._todoList.next(Object.assign({}, this.dataStore).todoList);
      }, error => console.log('Could not load todo.'));
  }
  public addTodo(newTodo: Todo) {
    console.log("addTodo");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add todo : ' + JSON.stringify(newTodo));


    this.http.post(`${this.baseUrl}AddTodo/`, JSON.stringify(newTodo), { headers: headers })
      .map(response => response.json()).subscribe(data => {
        this.dataStore.todoList.push(data);
        this._todoList.next(Object.assign({}, this.dataStore).todoList);
      }, error => console.log('Could not create todo.'));
  };

  public updateTodo(newTodo: Todo) {
    console.log("updateTodo");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add todo : ' + JSON.stringify(newTodo));


    this.http.put(`${this.baseUrl}UpdateTodo/`, JSON.stringify(newTodo), { headers: headers })
      .map(response => response.json()).subscribe(data => {
        this.dataStore.todoList.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.todoList[i] = data; }
        });
      }, error => console.log('Could not update todo.'));
  };

  removeItem(todoId: number) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log("removeItem:" + todoId);
    this.http.delete(`${this.baseUrl}DeleteTodo/${todoId}`, { headers: headers }).subscribe(response => {
      this.dataStore.todoList.forEach((t, i) => {
        if (t.id === todoId) { this.dataStore.todoList.splice(i, 1); }
      });

      this._todoList.next(Object.assign({}, this.dataStore).todoList);
    }, error => console.log('Could not delete todo.'));
  }
  private _serverError(err: any) {
    console.log('sever errorOK:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }
}

export class Todo {
  public id: number;
  public name: string;
}