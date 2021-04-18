import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchTransactionService } from "../buscarTransaccion/buscarTransaccion.service";

@Component({
  templateUrl: "./buscarTransaccion.component.html",
  styleUrls: ["./buscarTransaccion.component.css"]
})
export class SearchTransactionComponent{

  constructor (private service: SearchTransactionService){

  }

  onSearchTransaction(form : NgForm){

    if (form.invalid){
      return ;
    }


    this
     .service
     .searchTransaction(form.value.identification, form.value.code, form.value.transacction);

     form.resetForm();
  }

}
