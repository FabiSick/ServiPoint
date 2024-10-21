import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatEnVivoPage } from './chat-en-vivo.page';

const routes: Routes = [
  {
    path: '',
    component: ChatEnVivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatEnVivoPageRoutingModule {}
