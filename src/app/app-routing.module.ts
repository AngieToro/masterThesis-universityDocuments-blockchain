import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

import { CreateTransactionComponent } from './crearTransaccion/crearTransaccion.component';
import { SearchTransactionComponent } from './buscarTransaccion/buscarTransaccion.component';
import { ResultTransctionComponent } from './resultadoTransaccion/resultadoTransaccion.component';

const routes: Routes = [

  {
    path: '',
    component: CreateTransactionComponent
  },
  {
    path: 'buscar',
    component: SearchTransactionComponent
  },
  {
    path: 'resultado',
    component: ResultTransctionComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{}
