import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrViewCartComponent } from './menu-or-view-cart.component';

describe('MenuOrViewCartComponent', () => {
  let component: MenuOrViewCartComponent;
  let fixture: ComponentFixture<MenuOrViewCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOrViewCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOrViewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
