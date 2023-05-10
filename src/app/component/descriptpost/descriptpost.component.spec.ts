import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptpostComponent } from './descriptpost.component';

describe('DescriptpostComponent', () => {
  let component: DescriptpostComponent;
  let fixture: ComponentFixture<DescriptpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
