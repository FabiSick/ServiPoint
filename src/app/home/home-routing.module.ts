import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'agendar-visita',
    loadChildren: () => import('../agendar-visita/agendar-visita.module').then(m => m.AgendarVisitaPageModule)
  },
  {
    path: 'soporte-remoto',
    loadChildren: () => import('../soporte-remoto/soporte-remoto.module').then(m => m.SoporteRemotoPageModule)
  },
  {
    path: 'chat-en-vivo',
    loadChildren: () => import('../chat-en-vivo/chat-en-vivo.module').then(m => m.ChatEnVivoPageModule)
  },
  {
    path: 'soporte-telefonico',
    loadChildren: () => import('../soporte-telefonico/soporte-telefonico.module').then(m => m.SoporteTelefonicoPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('../solicitudes/solicitudes.module').then(m => m.SolicitudesPageModule)
  },
  {
    path: 'suscripciones',
    loadChildren: () => import('../suscripciones/suscripciones.module').then(m => m.SuscripcionesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
