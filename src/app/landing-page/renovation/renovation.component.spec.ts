import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovationComponent } from './renovation.component';

describe('RenovationComponent', () => {
  let component: RenovationComponent;
  let fixture: ComponentFixture<RenovationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenovationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
