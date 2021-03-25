import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './model/todo';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  todos$: Observable<Todo[]> = this.todoService.getAll();
  phrase: string = "";
  columnKey: string = '';


  selectedTodo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
  ) {}

  onDelete(todo: Todo): void {
    let resp = confirm ("Nyomja meg az OK gombot a törléshez.")
    if (resp === true) {
      this.todoService.remove(todo).subscribe(
        () => {
          this.todos$ = this.todoService.getAll();
        }
      );
    }
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  
  onColumnSelect(key: string): void {
    this.columnKey = key;
  }

  onCheckboxChange(todo: Todo): void {
    todo.active = !todo.active;
    this.todoService.update(todo).subscribe();
  }

  onCreate(todo: Todo): void {
      this.todoService.create(todo).subscribe(
        () => {
          this.todos$ = this.todoService.getAll();
        }
      );
    }




}
