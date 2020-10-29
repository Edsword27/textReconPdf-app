import { Component, OnInit } from '@angular/core';
import { DisablerUtility } from '../disablerUtility';

@Component({
  selector: 'app-toolbar-main',
  templateUrl: './toolbar-main.component.html',
  styleUrls: ['./toolbar-main.component.css']
})

export class ToolbarMainComponent implements OnInit {
  filePath : string;  //Direccion del archivo PDF en el equipo
  placeHold : string = "Ingrese documento PDF";  //Texto a aparecer en barra en el toolbar
  disableElements : boolean = true;   //Indica la deshabilitacion de ciertos elementos en pantalla
  searchButtonDisabler : boolean = false;  //Indica la deshabilitacion de unicamente el boton de busqueda

  constructor(private readonly disablerUtility:DisablerUtility){}

  ngOnInit() {
    this.disablerUtility.OnDisable.subscribe(value =>
      {
        this.disableSearchButton();
      });
  }

  //Realiza ciertas asignaciones de valores relacionados al PDF una vez que ya se ha seleccionado
  onFileSelected() {
    let $img: any = document.querySelector('#fileInput');
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePath = e.target.result;
        let imag = new Image();
        imag.src = e.target.result;
        imag.onload = (a: any) => {
          console.log(a.width);
        };
      };
      reader.readAsArrayBuffer($img.files[0]);
    }
    this.placeHold = this.filePath;
    this.disableElements = false;
  }

  //Coloca en true una variable booleana asociada a la deshabilitacion del boton de busqueda del documento
  disableSearchButton(){
    this.searchButtonDisabler = true;
  }

}