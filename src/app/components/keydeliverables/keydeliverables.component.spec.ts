import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeydeliverablesComponent } from './keydeliverables.component';

describe('KeydeliverablesComponent', () => {
  let component: KeydeliverablesComponent;
  let fixture: ComponentFixture<KeydeliverablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeydeliverablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeydeliverablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
