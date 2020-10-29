import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-manage',
  templateUrl: './pdf-manage.component.html',
  styleUrls: ['./pdf-manage.component.css']
})
export class PdfManageComponent implements OnInit {
  selection : string = "Todas las paginas"; //Almacena la opcion de seleccion de paginas que se ha escogido
  page : number = 1;  //Indica la pagina del documento que se esta mostrando actualmente en pantalla
  pageWidth : number = 0; //Almacena el ancho de una pagina del documento
  pageHeight : number = 0;  //Almacena el alto de una pagina del documento
  pagesTotal : number = 0;  //Almacena el total de paginas del documento
  rangeBegin : number;  //Almacena el inicio del rango de paginas a almacenar (Si se ha seleccionado esa opcion)
  rangeEnd : number;  //Almacena el final del rango de paginas a almacenar (Si se ha seleccionado esa opcion)
  pagesSelected : Array<number> = []; //Arreglo con los numeros de las paginas seleccionadas
  pagesListed : string; //Paginas listadas en la opcion "Lista de Paginas"
  actRange : boolean = false; //Flag para indicar que la opcion de rango es la seleccionada
  actList : boolean = false;  //Flag para indicar que la opcion de lista es la seleccionada
  @Input() disabler : boolean;  //Indica la activacion o desactivacion de elementos en pantalla
  @Input() pdfPath : string;  //Ruta del documento pdf en el equipo
  @ViewChild(PdfViewerComponent, {static: false}) private pdfComponent: PdfViewerComponent;
  @ViewChild('pagi', {static: false}) divPage: PdfViewerComponent;

  constructor() { }

  ngOnInit() {
  }

  //Permite mostrar la pagina del documento anterior a la actual
  prevPage(){
    if(this.page != 1)
      this.page = this.page - 1;
  }

  //Permite mostrar la siguiente pagina del documento
  nextPage(){
    if(this.page != this.pagesTotal)
      this.page = this.page + 1;
  }

  //Segun la opcion seleccionada, crea la lista de paginas correspondiente a esa seleccion
  createSelectedPageList(){
    switch(this.selection){
      case "Todas las paginas":
        for(let i=0; i<this.pagesTotal; i++){
          this.pagesSelected.push(i+1);
        }
        break;

      case "Rango de paginas":
        for(let i=this.rangeBegin-1; i<this.rangeEnd; i++){
          this.pagesSelected.push(i+1);
        }
        break;

      case "Lista de paginas":
        let numberToString : string = "";
        let pageNumber : number;
        for(let i=0; i<this.pagesListed.length; i++){
          let aux = this.pagesListed.charAt(i);
          if(this.pagesListed.charAt(i) != ' '){
            if(this.pagesListed.charAt(i) != ','){
              numberToString = numberToString + this.pagesListed.charAt(i);
            }
            else{
              if(!isNaN(Number(numberToString))){
                pageNumber = Number(numberToString);
                this.pagesSelected.push(pageNumber);
                numberToString = "";
              }
            }
          }
        }
        if(!isNaN(Number(numberToString))){
          pageNumber = Number(numberToString);
          this.pagesSelected.push(pageNumber);
        }
        break;
    }
  }

  //Obtiene el ancho y el alto de una pagina del documento
  getPageMeasurements(){
    this.pageHeight = this.divPage.pdfViewerContainer.nativeElement.firstChild.firstChild.offsetHeight;
    this.pageWidth = this.divPage.pdfViewerContainer.nativeElement.firstChild.firstChild.offsetWidth;
  }

  //Activa el flag de la opcion "Todas las paginas" y desactiva los demas
  selectAllPages(){
    this.actRange = false;
    this.actList = false;
  }

  //Activa el flag de la opcion "Rango de paginas" y desactiva los demas
  selectPagesRange(){
    this.actRange = true;
    this.actList = false;
  }

  //Activa el flag de la opcion "Lista de paginas" y desactiva los demas
  selectPageList(){
    this.actRange = false;
    this.actList = true;
  }

  //Obtiene el numero total de paginas despues que el documento se haya cargado
  afterLoadComplete(pdf:PDFDocumentProxy){
    this.pagesTotal = pdf.numPages;
  }

  //Impide la escritura de ciertos caracteres en el campo de texto de la lista de paginas
  preventCharacters(event: KeyboardEvent){
    const inputChar = String.fromCharCode(event.charCode);
    if(this.checkCharacter(inputChar)){
      event.preventDefault();
    }
  }

  //Funcion auxiliar de preventCharacters, con el fin de revisar que el caracter ingresado sea uno de los deseados
  checkCharacter(charac:string){
    if(charac == ",")
      return false;

    if(charac == " ")
      return false;

    if(charac == "0")
      return false;

    if(charac == "1")
      return false;

    if(charac == "2")
      return false;

    if(charac == "3")
      return false;

    if(charac == "4")
      return false;

    if(charac == "5")
      return false;

    if(charac == "6")
      return false;
      
    if(charac == "7")
      return false;

    if(charac == "8")
      return false;
      
    if(charac == "9")
      return false;

    return true;
  }
}