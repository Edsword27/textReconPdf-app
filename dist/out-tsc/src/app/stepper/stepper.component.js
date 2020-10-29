import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { PdfManageComponent } from '../pdf-manage/pdf-manage.component';
import { ContentSelectionComponent } from '../content-selection/content-selection.component';
let StepperComponent = class StepperComponent {
    constructor() {
        this.pagina = 1;
        this.seleccion = 'Todas las paginas';
        this.listaPaginas = [0];
        this.anchoPagina = 0;
        this.altoPagina = 0;
    }
    procesarDatos() {
        this.pdfmanageComponent.listarPaginasSeleccionadas();
        this.pdfmanageComponent.obtenerMedidasPagina();
        this.listaPaginas = this.pdfmanageComponent.paginasSeleccionadas;
        this.altoPagina = this.pdfmanageComponent.altoPag;
        this.anchoPagina = this.pdfmanageComponent.anchoPag;
        for (let i = 0; i < this.listaPaginas.length; i++) {
            this.contentselectionComponent.addSelection(this.listaPaginas[i], 0, 0, this.altoPagina, this.anchoPagina);
        }
    }
};
tslib_1.__decorate([
    Input()
], StepperComponent.prototype, "fuenteDoc", void 0);
tslib_1.__decorate([
    Input()
], StepperComponent.prototype, "deshabilitar", void 0);
tslib_1.__decorate([
    ViewChild(PdfManageComponent, { static: false })
], StepperComponent.prototype, "pdfmanageComponent", void 0);
tslib_1.__decorate([
    ViewChild(ContentSelectionComponent, { static: false })
], StepperComponent.prototype, "contentselectionComponent", void 0);
StepperComponent = tslib_1.__decorate([
    Component({
        selector: 'app-stepper',
        templateUrl: './stepper.component.html',
        styleUrls: ['./stepper.component.css']
    })
], StepperComponent);
export { StepperComponent };
//# sourceMappingURL=stepper.component.js.map