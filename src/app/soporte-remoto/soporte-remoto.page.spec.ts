import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoporteRemotoPage } from './soporte-remoto.page';

describe('SoporteRemotoPage', () => {
  let component: SoporteRemotoPage;
  let fixture: ComponentFixture<SoporteRemotoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteRemotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
