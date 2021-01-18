import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingChangesComponent } from './upcoming-changes.component';

describe('UpcomingChangesComponent', () => {
  let component: UpcomingChangesComponent;
  let fixture: ComponentFixture<UpcomingChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
