import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNotesComponent } from './open-notes.component';

describe('OpenNotesComponent', () => {
  let component: OpenNotesComponent;
  let fixture: ComponentFixture<OpenNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
