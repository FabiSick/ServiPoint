import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoporteTelefonicoPage } from './soporte-telefonico.page';

describe('SoporteTelefonicoPage', () => {
  let component: SoporteTelefonicoPage;
  let fixture: ComponentFixture<SoporteTelefonicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteTelefonicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
