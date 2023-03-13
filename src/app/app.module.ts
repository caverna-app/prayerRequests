import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputFormComponent } from './component/input-form/input-form.component';
import { ReportComponent } from './component/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
