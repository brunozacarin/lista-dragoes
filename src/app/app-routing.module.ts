import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro-usuario/cadastro-usuario.module').then(m => m.CadastroUsuarioModule)
  },
  {
    path: 'dragoes',
    loadChildren: () => import('./dragoes/dragoes.module').then(m => m.DragoesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dragoes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
