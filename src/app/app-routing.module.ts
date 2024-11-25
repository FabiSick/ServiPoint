import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Asegúrate de importar el guard aquí
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege esta ruta con AuthGuard
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then( m => m.UserManagementPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementPageModule),
    canActivate: [AdminGuard]  // Solo los administradores pueden acceder a esta ruta
  },  {
    path: 'agendar-visita',
    loadChildren: () => import('./agendar-visita/agendar-visita.module').then( m => m.AgendarVisitaPageModule)
  },
  {
    path: 'soporte-remoto',
    loadChildren: () => import('./soporte-remoto/soporte-remoto.module').then( m => m.SoporteRemotoPageModule)
  },
  {
    path: 'chat-en-vivo',
    loadChildren: () => import('./chat-en-vivo/chat-en-vivo.module').then( m => m.ChatEnVivoPageModule)
  },
  {
    path: 'soporte-telefonico',
    loadChildren: () => import('./soporte-telefonico/soporte-telefonico.module').then( m => m.SoporteTelefonicoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'suscripciones',
    loadChildren: () => import('./suscripciones/suscripciones.module').then( m => m.SuscripcionesPageModule)
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'misuscripcion',
    loadChildren: () => import('./misuscripcion/misuscripcion.module').then( m => m.MisuscripcionPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
