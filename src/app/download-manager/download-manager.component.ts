import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-manager',
  templateUrl: './download-manager.component.html',
  styleUrls: ['./download-manager.component.css']
})
export class DownloadManagerComponent implements OnInit {
  urlPdf : string = 'assets/archivo.pdf';
  urlWord : string = 'assets/archivo.docx';
  urlTextfile : string = 'assets/archivo.txt';
  filenamePdf : string = "Texto extraido.pdf";
  filenameWord : string = "Texto extraido.docx";
  filenameTextfile : string = "Texto extraido.txt";

  constructor() { }

  ngOnInit() {
  }
}