import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesallComponent } from './businesall.component';

describe('BusinesallComponent', () => {
  let component: BusinesallComponent;
  let fixture: ComponentFixture<BusinesallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
