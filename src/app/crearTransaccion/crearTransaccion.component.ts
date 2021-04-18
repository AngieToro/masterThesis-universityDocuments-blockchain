import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CreateTransactionService } from './crearTransaccion.service';



@Component({
  selector: "crearTransaccion",
  templateUrl: "./crearTransaccion.component.html",
  styleUrls: ["./crearTransaccion.component.css"]
})

export class CreateTransactionComponent implements OnInit{

  constructor(private service: CreateTransactionService,
      private route : ActivatedRoute, public snackBar: MatSnackBar)  {

  }

  ngOnInit() {

      this.route
        .queryParams
        .subscribe(params => {
          if (params.message != null) {
            this.snackBar.open(params.message, null, {
              duration: 60000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          }
        });
      }

  onCreateTransaction(form: NgForm){

    if (form.invalid){
      return;
    }

    this
      .service
      .createTransaction(form.value.identification, form.value.code);

      form.resetForm();
  }
}
