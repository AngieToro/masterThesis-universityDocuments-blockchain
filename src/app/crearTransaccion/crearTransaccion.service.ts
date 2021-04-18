import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TransactionModel } from './crearTransaccionModel';

@Injectable({ providedIn: "root" })
export class  CreateTransactionService{

  constructor(private http: HttpClient, private router: Router){

  }

  createTransaction(identificationP: string, codeP: string){

    const transaction : TransactionModel = ({
      identification: identificationP,
      code: codeP
    });

    return this.http
      .post<{message: string}>("http://localhost:3001/api/transaction/datos",transaction)
      .subscribe(response => {
        this.router.navigate(["/"], { queryParams: { message: response.message } });
      }, error => {
        //console.log("error= ", error.message);
        this.router.navigate["/"];
      });
  }
}
