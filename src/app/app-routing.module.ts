import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './component/input-form/input-form.component';
import { ReportComponent } from './component/report/report.component';

const routes: Routes = [
  { path: "", component: InputFormComponent },
  { path: "lista", component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
