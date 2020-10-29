import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { PdfManageComponent } from '../pdf-manage/pdf-manage.component';
import { ContentSelectionComponent } from '../content-selection/content-selection.component';
import { DisablerUtility } from '../disablerUtility';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  pageList : Array<number> = [0]; //Listado de paginas seleccionadas
  pageWidth : number = 0; //Ancho de cada pagina en el documento
  pageHeight : number = 0;  //Altura de cada pagina en el documento
  firstPage : number = 1; //Almacena el numero de la primera pagina de la lista de paginas seleccionadas. Por default es la 1
  @Input() documentPath : string; //Direccion del documento en el equipo
  @Input() disableState : boolean;  //Indica si se deben deshabilitar o no ciertos elementos en pantalla
  @ViewChild(PdfManageComponent, {static:false}) private pdfmanageComponent: PdfManageComponent;
  @ViewChild(ContentSelectionComponent, {static:false}) private contentselectionComponent: ContentSelectionComponent;

  constructor(private readonly disablerUtility:DisablerUtility){}

  ngOnInit(){
  }

  //Realiza varias operaciones necesarias para los siguientes pasos
  processData(){
    this.pdfmanageComponent.createSelectedPageList();
    this.pdfmanageComponent.getPageMeasurements();
    this.pageList = this.pdfmanageComponent.pagesSelected;
    this.firstPage = this.pageList[0];
    this.pageHeight = this.pdfmanageComponent.pageHeight;
    this.pageWidth = this.pdfmanageComponent.pageWidth;
    for(let i:number = 0; i < this.pageList.length; i++){
      this.contentselectionComponent.addSelection(this.pageList[i], 0, 0, this.pageHeight, this.pageWidth);
    }
    this.disablerUtility.emitDisabler();
  }
}