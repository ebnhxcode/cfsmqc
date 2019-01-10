import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calidadcondicion',
  templateUrl: './calidadcondicion.page.html',
  styleUrls: ['./calidadcondicion.page.scss'],
})
export class CalidadcondicionPage implements OnInit {

  servicio: {
    nota_calidad:0,
    nota_condicion:0,
  }

  constructor() { }

  ngOnInit() {
    
  }

}
