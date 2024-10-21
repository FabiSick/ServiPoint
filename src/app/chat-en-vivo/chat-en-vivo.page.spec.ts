import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatEnVivoPage } from './chat-en-vivo.page';

describe('ChatEnVivoPage', () => {
  let component: ChatEnVivoPage;
  let fixture: ComponentFixture<ChatEnVivoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEnVivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
