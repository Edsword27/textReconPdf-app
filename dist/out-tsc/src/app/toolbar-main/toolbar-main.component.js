import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ToolbarMainComponent = class ToolbarMainComponent {
    //@ViewChild('entradaArchivo', {static:false}) archivoPdf : ElementRef;
    constructor() {
        this.placeHold = "Ingrese documento PDF";
        this.desactivar_elementos = true;
    }
    onFileSelected() {
        let $img = document.querySelector('#entradaDocumento');
        if (typeof (FileReader) !== 'undefined') {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.rutaPdf = e.target.result;
                let imag = new Image();
                imag.src = e.target.result;
                imag.onload = (a) => {
                    console.log(a.width);
                };
            };
            reader.readAsArrayBuffer($img.files[0]);
        }
        this.placeHold = this.rutaPdf;
        this.desactivar_elementos = false;
    }
};
ToolbarMainComponent = tslib_1.__decorate([
    Component({
        selector: 'app-toolbar-main',
        templateUrl: './toolbar-main.component.html',
        styleUrls: ['./toolbar-main.component.css']
    })
], ToolbarMainComponent);
export { ToolbarMainComponent };
//# sourceMappingURL=toolbar-main.component.js.map