import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import{ Page_selection } from '../page_selection.model';

@Component({
  selector: 'app-content-selection',
  templateUrl: './content-selection.component.html',
  styleUrls: ['./content-selection.component.css']
})
export class ContentSelectionComponent implements OnInit {
  startX:number=null; //Almacena la posicion X del primer punto seleccionado para el rectangulo de seleccion
  startY:number=null; //Almacena la posicion Y del primer punto seleccionado para el rectangulo de seleccion
  finalX:number=null; //Almacena la posicion X del ultimo punto seleccionado para el rectangulo de seleccion
  finalY:number=null; //Almacena la posicion X del ultimo punto seleccionado para el rectangulo de seleccion
  drag=false; //Indica si se esta arrastrando o no el puntero sobre el canvas
  pageCount:number=0; //Contador auxiliar para las paginas del documento
  selection_data = new Array<Page_selection>(); //Arreglo con el contenido de todos los datos relacionados a la seleccion en cada pagina del documento
  @Input() page : number=1;  //Indica la pagina actual del documento mostrada en pantalla
  @Input() pdfPath : string;  //Ruta del documento en el equipo
  @Input() page_list : number[];  //Lista de paginas seleccionadas previamente
  @Input() canvasHeight : number; //Altura del canvas
  @Input() canvasWidth : number;  //Ancho del canvas
  @Input() disabler : boolean;  //Indica la activacion o desactivacion de elementos en pantalla
  @ViewChild("myCanvas", {static:false}) myCanvas:ElementRef;

  constructor() { }

  //Evento de Mouse Down, con operaciones previas a la creacion del rectangulo
  mdEvent(e){
    //Limpiamos del canvas cualquier rectangulo
    let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.clearRect(0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    //Obtenemos la posicion del primer punto del rectangulo
    this.startX=e.clientX;
    this.startY=e.clientY;
    this.drag=true;
  }

  //Se crea un nuevo rectangulo por cada instante que dure el arrastre del puntero, creando el afecto de agrandado del rectangulo
  mmEvent(e){
    if(this.drag){
      //Limpiamos el canvas de cualquier rectangulo creado en un instante anterior del arrastre
      let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
      context.clearRect(0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
      //Obtenemos los valores actualizados a usar
      let canvasTop = this.myCanvas.nativeElement.getBoundingClientRect().top;
      let canvasLeft = this.myCanvas.nativeElement.getBoundingClientRect().left;
      let x = this.startX - canvasLeft;
      let y = this.startY - canvasTop;
      let w = e.clientX - canvasLeft - x;
      let h = e.clientY - canvasTop - y;
      //Dibujamos el rectangulo actualizado en el canvas
      context.setLineDash([6]);
      context.strokeRect(x, y, w, h);
    }
  }

  //Evento de Mouse Up, con operaciones para finalizar la creacion del rectangulo
  muEvent(e){
    //Limpiamos del canvas cualquier rectangulo
    let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.clearRect(0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    //Obtenemos los valores actualizados a usar
    let cTop = this.myCanvas.nativeElement.getBoundingClientRect().top;
    let cLeft = this.myCanvas.nativeElement.getBoundingClientRect().left;
    let x = this.startX - this.myCanvas.nativeElement.getBoundingClientRect().left;
    let y = this.startY - this.myCanvas.nativeElement.getBoundingClientRect().top;
    let w = e.clientX - this.myCanvas.nativeElement.getBoundingClientRect().left - x;
    let h = e.clientY - this.myCanvas.nativeElement.getBoundingClientRect().top - y;
    //Dibujamos el rectangulo actualizado en el canvas
    context.setLineDash([6]);
    context.strokeRect(x, y, w, h);
    this.finalX = e.clientX;
    this.finalY = e.clientY;
    this.drag = false;
    this.updateSelection(x, y, w, h);
  }

  //Permite mostrar la pagina del documento anterior a la actual y administra datos relacionadas
  prevPage(){
    let actualSelection : Page_selection;
    if(this.pageCount != 0){
      this.pageCount = this.pageCount - 1;
      this.page = this.page_list[this.pageCount];
      for(let i=0; i<this.page_list.length; i++){
        if(this.selection_data[i].pageId == this.page_list[this.pageCount]){
          actualSelection = this.selection_data[i];
        }
      }
      this.drawRectangle(actualSelection.positionX, actualSelection.positionY, actualSelection.width, actualSelection.height);
    }
  }

  //Permite mostrar la siguiente pagina del documento y administra datos relacionadas
  nextPage(){
    let actualSelection : Page_selection;
    if(this.pageCount != (this.page_list.length - 1)){
      this.pageCount = this.pageCount + 1;
      this.page = this.page_list[this.pageCount];
      for(let i=0; i<this.page_list.length; i++){
        if(this.selection_data[i].pageId == this.page_list[this.pageCount]){
          actualSelection = this.selection_data[i];
        }
      }
      this.drawRectangle(actualSelection.positionX, actualSelection.positionY, actualSelection.width, actualSelection.height);
    }
  }

  //Actualiza los datos de seleccion de la pagina actualmente mostrada
  updateSelection(x:number, y:number, w:number, h:number){
    let initX : number;
    let initY : number;
    let positiveWidth : number;
    let positiveHeight : number;
    let updatedSelection : Page_selection;
    if(w < 0){
      initX = x + w;
      positiveWidth = w*(-1);
    }
    else{
      initX = x;
      positiveWidth = w;
    }
    if(h < 0){
      initY = y + h;
      positiveHeight = h*(-1);
    }
    else{
      initY = y;
      positiveHeight = h;
    }
    for(let i=0; i<this.page_list.length; i++){
      if(this.selection_data[i].pageId == this.page_list[this.pageCount]){
        updatedSelection = this.selection_data[i];
      }
    }
    updatedSelection.positionX = initX;
    updatedSelection.positionY = initY;
    updatedSelection.height = positiveHeight;
    updatedSelection.width = positiveWidth;
  }

  //Realiza ciertas operaciones al inicio de la instanciacion de la aplicacion
  ngOnInit() {
    
  }

  //Crea los datos de una nueva seleccion hecha en una pagina
  addSelection(idPage:number, x:number, y:number, h:number, w:number){
    let selection:Page_selection = new Page_selection(idPage, x, y, h, w);
    this.selection_data.push(selection);
  }

  //Retorna los datos de seleccion de una pagina especifica
  searchSelection(idPage:number) :  Page_selection{
    let searchedSelection : Page_selection;
    return searchedSelection;
  }

  //Lleva a cabo las operaciones necesarias para la creacion de un rectangulo en el canvas
  drawRectangle(recX:number, recY:number, recW:number, recH:number){
    let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.clearRect(0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    context.setLineDash([6]);
    context.strokeRect(recX, recY, recW, recH);
  }

  //Crea una seleccion, en la pagina actual, que cubra toda la extension de la pagina
  selectFullPage(){
    let actualSelection : Page_selection;
    let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
    context.clearRect(0,0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
    context.setLineDash([6]);
    context.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);
    for(let i=0; i<this.page_list.length; i++){
      if(this.selection_data[i].pageId == this.page_list[this.pageCount]){
        actualSelection = this.selection_data[i];
      }
    }
    actualSelection.positionX = 0;
    actualSelection.positionY = 0;
    actualSelection.height = this.canvasHeight;
    actualSelection.width = this.canvasWidth;
  }
}