import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-text-modify',
  templateUrl: './text-modify.component.html',
  styleUrls: ['./text-modify.component.css']
})
export class TextModifyComponent implements OnInit {
  pageCounter:number=0;
  textSelected = new Array<string>();
  @Input() page:number=1;
  @Input() pdfPath : string;
  @Input() page_list : number[];
  @Input() canvasHeight : number;
  @Input() canvasWidth : number;
  //@ViewChild("myCanvas", {static:false}) myCanvas:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  prevPage(){
    if(this.pageCounter != 0){
      this.pageCounter = this.pageCounter - 1;
      this.page = this.page_list[this.pageCounter];
    }
  }

  nextPage(){
    if(this.pageCounter != (this.page_list.length - 1)){
      this.pageCounter = this.pageCounter + 1;
      this.page = this.page_list[this.pageCounter];
    }
  }

}
