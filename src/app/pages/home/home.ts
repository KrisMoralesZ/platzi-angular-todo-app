import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal([
    'Install Angular CLi',
    'Create Project',
    'Create Component',
    'Create Service',
  ]);
}
