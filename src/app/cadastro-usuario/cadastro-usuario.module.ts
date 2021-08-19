import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroUsuarioRoutingModule } from './cadastro-usuario-routing.module';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastroUsuarioRoutingModule,
    NgbAlertModule
  ]
})
export class CadastroUsuarioModule { }
