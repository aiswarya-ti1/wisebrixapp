import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineitemdisplayComponent } from './lineitemdisplay.component';

describe('LineitemdisplayComponent', () => {
  let component: LineitemdisplayComponent;
  let fixture: ComponentFixture<LineitemdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineitemdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineitemdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
