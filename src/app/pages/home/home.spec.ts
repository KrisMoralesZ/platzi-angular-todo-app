import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Home } from './home';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();

    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tasks from localStorage', () => {
    const mockTasks = [{ id: 1, title: 'Saved task', completed: false }];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));

    const comp = TestBed.createComponent(Home).componentInstance;
    comp.ngOnInit();

    expect(comp.tasks().length).toBe(1);
    expect(comp.tasks()[0].title).toBe('Saved task');
  });

  it('should add a new task', () => {
    component.addTask('Learn Angular testing');
    expect(component.tasks().length).toBe(1);
    expect(component.tasks()[0].title).toBe('Learn Angular testing');
  });

  it('should toggle a task as completed', () => {
    component.addTask('Toggle test');
    component.updateTask(0);

    expect(component.tasks()[0].completed).toBeTrue();
  });

  it('should filter tasks correctly', () => {
    component.addTask('Pending task');
    component.addTask('Completed task');
    component.updateTask(1);

    component.changeFilter('pending');
    expect(component.tasksByFilter().length).toBe(1);
    expect(component.tasksByFilter()[0].title).toBe('Pending task');

    component.changeFilter('completed');
    expect(component.tasksByFilter().length).toBe(1);
    expect(component.tasksByFilter()[0].title).toBe('Completed task');
  });

  it('should enable editing mode on a task', () => {
    component.addTask('Task to edit');
    component.updateTaskEditingMode(0);

    expect(component.tasks()[0].editing).toBeTrue();
  });

  it('should update the task text', () => {
    component.addTask('Old text');
    const inputEvent = {
      target: { value: 'New text' },
    } as unknown as Event;

    component.updateTaskText(0, inputEvent);

    expect(component.tasks()[0].title).toBe('New text');
    expect(component.tasks()[0].editing).toBeFalse();
  });

  it('should delete a task', () => {
    component.addTask('Task to delete');
    component.deleteTask(0);

    expect(component.tasks().length).toBe(0);
  });

  it('should clear the input after adding a task via changeHandler', () => {
    component.newTaskControl.setValue('New task');
    component.changeHandler();

    expect(component.tasks().length).toBe(1);
    expect(component.newTaskControl.value).toBe('');
  });

  it('should not add an empty task via changeHandler', () => {
    component.newTaskControl.setValue('   ');
    component.changeHandler();

    expect(component.tasks().length).toBe(0);
  });
});
