import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoporteRemotoPage } from './soporte-remoto.page';

const routes: Routes = [
  {
    path: '',
    component: SoporteRemotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoporteRemotoPageRoutingModule {}
