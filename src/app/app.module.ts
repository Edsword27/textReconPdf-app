import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule,MatOptionModule, MatSelectModule, MatIconModule} from '@angular/material'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ToolbarMainComponent } from './toolbar-main/toolbar-main.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { PdfManageComponent } from './pdf-manage/pdf-manage.component';
import { ContentSelectionComponent } from './content-selection/content-selection.component';
import { TextModifyComponent } from './text-modify/text-modify.component';
import { DownloadManagerComponent } from './download-manager/download-manager.component';
import { DisablerUtility } from './disablerUtility';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarMainComponent,
    StepperComponent,
    PdfManageComponent,
    ContentSelectionComponent,
    TextModifyComponent,
    DownloadManagerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  providers: [DisablerUtility],
  bootstrap: [AppComponent]
})
export class AppModule { }
