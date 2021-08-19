import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { DragoesComponent } from './dragoes.component';
import { EditDragaoComponent } from './edit-dragao/edit-dragao.component';

const routes: Routes = [
  {
    path: '',
    component: DragoesComponent,
    children: [
      {
        path: '',
        component: DragoesComponent
      }
    ]
  },
  {
    path: 'add',
    component: EditDragaoComponent
  },
  {
    path: 'edit/:id',
    component: EditDragaoComponent
  },
  {
    path: 'view/:id',
    component: EditDragaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragoesRoutingModule { }
