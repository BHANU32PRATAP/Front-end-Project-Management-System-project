import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reaports } from './reaports';

describe('Reaports', () => {
  let component: Reaports;
  let fixture: ComponentFixture<Reaports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reaports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reaports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
