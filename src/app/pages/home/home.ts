import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Install Angular CLi',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Create Project',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Create Component',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Create Service',
      completed: false,
    },
  ]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  changeHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !== '') {
        this.addTask(value)
        this.newTaskControl.setValue('')
      }
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}
