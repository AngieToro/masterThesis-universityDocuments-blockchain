import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TransactionModel } from "../buscarTransaccion/buscarTransaccionModel";

@Injectable({ providedIn: "root" })
export class SearchTransactionService{

  constructor (private http: HttpClient, private router: Router){

  }

  searchTransaction(identificationP: string, codeP: string, transacctionP: string) {

    const queryParams = `?identification=${identificationP}&code=${codeP}&transacction=${transacctionP}`;

    this.http
      .get<{message: string; data: any}>("http://localhost:3001/api/transaction/buscar" + queryParams)
      .subscribe(response => {

        const transaction : TransactionModel = ({
          status: response.data.status,
          identification: response.data.identification,
          firstName: response.data.firstName,
          secondName: response.data.secondName,
          firstLastName: response.data.firstLastName,
          secondLastName: response.data.secondLastName,
          codeDoc: response.data.codeDoc,
          typeDoc: response.data.typeDoc,
          dateDoc: response.data.dateDoc
        });

        this.router.navigate(["/resultado"], { queryParams: {message: response.message, data: JSON.stringify(transaction)}});
      }, error => {
        console.log("error= ", error.message);
        this.router.navigate(["/buscar"]);
      });
  }
}
