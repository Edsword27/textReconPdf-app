import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
let PdfManageComponent = class PdfManageComponent {
    constructor() {
        this.seleccion = "Todas las paginas";
        this.pagina = 1;
        this.anchoPag = 0;
        this.altoPag = 0;
        this.cantidadPaginas = 0;
        this.paginasSeleccionadas = [0];
        this.actRango = false;
        this.actLista = false;
    }
    ngOnInit() {
    }
    paginaPrevia() {
        if (this.pagina != 1)
            this.pagina = this.pagina - 1;
    }
    paginaSiguiente() {
        if (this.pagina != this.cantidadPaginas)
            this.pagina = this.pagina + 1;
    }
    listarPaginasSeleccionadas() {
        switch (this.seleccion) {
            case "Todas las paginas":
                for (let i = 0; i < this.cantidadPaginas; i++) {
                    this.paginasSeleccionadas.push(i + 1);
                }
                break;
            case "Rango de paginas":
                for (let i = this.inicioRango - 1; i < this.finalRango; i++) {
                    this.paginasSeleccionadas.push(i + 1);
                }
                break;
            case "Lista de paginas":
                break;
        }
    }
    obtenerMedidasPagina() {
        this.altoPag = this.divPagina.pdfViewerContainer.nativeElement.firstChild.firstChild.offsetHeight;
        this.anchoPag = this.divPagina.pdfViewerContainer.nativeElement.firstChild.firstChild.offsetWidth;
    }
    opcTodasPaginas() {
        this.actRango = false;
        this.actLista = false;
    }
    opcRangoPaginas() {
        this.actRango = true;
        this.actLista = false;
    }
    opcListaPaginas() {
        this.actRango = false;
        this.actLista = true;
    }
    afterLoadComplete(pdf) {
        this.cantidadPaginas = pdf.numPages;
    }
};
tslib_1.__decorate([
    Input()
], PdfManageComponent.prototype, "deshabilitador", void 0);
tslib_1.__decorate([
    Input()
], PdfManageComponent.prototype, "fuentePdf", void 0);
tslib_1.__decorate([
    ViewChild(PdfViewerComponent, { static: false })
], PdfManageComponent.prototype, "pdfComponent", void 0);
tslib_1.__decorate([
    ViewChild('pagi', { static: false })
], PdfManageComponent.prototype, "divPagina", void 0);
PdfManageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pdf-manage',
        templateUrl: './pdf-manage.component.html',
        styleUrls: ['./pdf-manage.component.css']
    })
], PdfManageComponent);
export { PdfManageComponent };
//# sourceMappingURL=pdf-manage.component.js.map