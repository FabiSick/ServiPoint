import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisuscripcionPage } from './misuscripcion.page';

describe('MisuscripcionPage', () => {
  let component: MisuscripcionPage;
  let fixture: ComponentFixture<MisuscripcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisuscripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
