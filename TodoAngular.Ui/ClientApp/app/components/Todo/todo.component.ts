import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { TodoService } from "./todoService";
import { Observable } from "rxjs/Observable";
import { Todo } from "./todoService"

@Component({
  selector: 'todo',
  providers: [TodoService],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  public todoList: Observable<Todo[]>;

  showEditor = true;
  myName: string;
  newTodo: Todo;
  constructor(private dataService: TodoService) {
    this.newTodo = new Todo();
  }
  // if you want to debug info  just uncomment the console.log lines.
  ngOnInit() {
    //    console.log("in ngOnInit");
    this.todoList = this.dataService.todoList;
    this.dataService.getAll();
  }
  public addTodo(item: Todo) {
    //console.dir(item);
    let todoId = this.dataService.addTodo(this.newTodo);
  }
  public updateTodo(item: Todo) {
    //  console.dir(item);
    //console.log("In updateTodo: " + item);
    this.dataService.updateTodo(item);
    //    console.log("in updateTodo:" );
  }
  public deleteTodo(todoId: number) {
    this.dataService.removeItem(todoId);
  }
}