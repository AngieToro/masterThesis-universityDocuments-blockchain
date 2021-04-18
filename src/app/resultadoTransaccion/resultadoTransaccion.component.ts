import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionModel } from '../buscarTransaccion/buscarTransaccionModel';


@Component({
  selector: "resultadoTransaccion",
  templateUrl: "./resultadoTransaccion.component.html",
  styleUrls: ["./resultadoTransaccion.component.css"]
})
export class ResultTransctionComponent implements OnInit{

  transaction: TransactionModel[] = [];

  constructor(private route : ActivatedRoute){

  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {

        const data = JSON.parse(params.data);
        console.log("data= ", data);

        this.transaction.push(data);
      });
  }
}
