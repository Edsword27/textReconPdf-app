export class Page_selection {
    pageId : number;    //Numero de identificacion para cada pagina
    positionX : number; //Posicion x de la esquina superior izquierda del rectangulo de seleccion
    positionY : number; //Posicion y de la esquina superior izquierda del rectangulo de seleccion
    width : number;     //Ancho (en pixeles) del rectangulo de seleccion
    height : number;    //Alto (en pixeles) del rectangulo de seleccion

    constructor(id:number, x:number, y:number, height:number, width:number){
        this.pageId = id;
        this.positionX = x;
        this.positionY = y;
        this.height = height;
        this.width = width;
    }
}