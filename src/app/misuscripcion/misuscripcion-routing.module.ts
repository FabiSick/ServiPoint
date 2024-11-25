import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisuscripcionPage } from './misuscripcion.page';

const routes: Routes = [
  {
    path: '',
    component: MisuscripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisuscripcionPageRoutingModule {}
