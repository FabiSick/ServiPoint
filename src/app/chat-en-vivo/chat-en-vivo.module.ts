import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatEnVivoPageRoutingModule } from './chat-en-vivo-routing.module';

import { ChatEnVivoPage } from './chat-en-vivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatEnVivoPageRoutingModule
  ],
  declarations: [ChatEnVivoPage]
})
export class ChatEnVivoPageModule {}
