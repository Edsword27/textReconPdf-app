import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
import { Page_selection } from '../page_selection.model';
let ContentSelectionComponent = class ContentSelectionComponent {
    constructor() {
        this.startX = null;
        this.startY = null;
        this.finalX = null;
        this.finalY = null;
        this.drag = false;
        this.pagina = 0;
        this.contPagina = 0;
    }
    mdEvent(e) {
        //Limpiamos del canvas cualquier rectangulo
        let context = this.myCanvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
        //Obtenemos la posicion del primer punto del rectangulo
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.drag = true;
    }
    //Se crea un nuevo rectangulo por cada instante que dure el arrastre del puntero, creando el afecto de agrandado del rectangulo
    mmEvent(e) {
        if (this.drag) {
            //Limpiamos el canvas de cualquier rectangulo creado en un instante anterior del arrastre
            let context = this.myCanvas.nativeElement.getContext("2d");
            context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
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
    muEvent(e) {
        //Limpiamos del canvas cualquier rectangulo
        let context = this.myCanvas.nativeElement.getContext("2d");
        context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
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
    paginaPrevia() {
        if (this.contPagina != 0) {
            this.contPagina = this.contPagina - 1;
            this.pagina = this.listadoPaginas[this.contPagina];
        }
    }
    paginaSiguiente() {
        if (this.contPagina != (this.listadoPaginas.length - 1)) {
            this.contPagina = this.contPagina + 1;
            this.pagina = this.listadoPaginas[this.contPagina];
        }
    }
    updateSelection(x, y, w, h) {
        let initX;
        let initY;
        let positiveWidth;
        let positiveHeight;
        let updatedSelection;
        if (w < 0) {
            initX = x + w;
            positiveWidth = w * (-1);
        }
        else {
            initX = x;
            positiveWidth = w;
        }
        if (h < 0) {
            initY = y + h;
            positiveHeight = h * (-1);
        }
        else {
            initY = y;
            positiveHeight = h;
        }
        for (let i = 0; i < this.listadoPaginas.length; i++) {
            if (this.datos_seleccion[i].pageId == this.contPagina) {
                updatedSelection = this.datos_seleccion[i];
            }
        }
        updatedSelection.positionX = initX;
        updatedSelection.positionY = initY;
        updatedSelection.height = positiveHeight;
        updatedSelection.width = positiveWidth;
    }
    ngOnInit() {
        console.log(this.listadoPaginas.length);
        this.pagina = this.listadoPaginas[this.contPagina];
    }
    addSelection(idPage, x, y, h, w) {
        let selection = new Page_selection(idPage, x, y, h, w);
        this.datos_seleccion.push(selection);
    }
    searchSelection(idPage) {
        let searchedSelection;
        return searchedSelection;
    }
};
tslib_1.__decorate([
    Input()
], ContentSelectionComponent.prototype, "fuentePdf", void 0);
tslib_1.__decorate([
    Input()
], ContentSelectionComponent.prototype, "listadoPaginas", void 0);
tslib_1.__decorate([
    Input()
], ContentSelectionComponent.prototype, "altoCanvas", void 0);
tslib_1.__decorate([
    Input()
], ContentSelectionComponent.prototype, "anchoCanvas", void 0);
tslib_1.__decorate([
    ViewChild("myCanvas", { static: false })
], ContentSelectionComponent.prototype, "myCanvas", void 0);
ContentSelectionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-content-selection',
        templateUrl: './content-selection.component.html',
        styleUrls: ['./content-selection.component.css']
    })
], ContentSelectionComponent);
export { ContentSelectionComponent };
//# sourceMappingURL=content-selection.component.js.map