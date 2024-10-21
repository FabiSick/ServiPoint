import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoporteTelefonicoPage } from './soporte-telefonico.page';

const routes: Routes = [
  {
    path: '',
    component: SoporteTelefonicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoporteTelefonicoPageRoutingModule {}
