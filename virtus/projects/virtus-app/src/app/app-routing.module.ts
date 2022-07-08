import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestvoiceComponent } from './testvoice/testvoice.component';

const routes: Routes = [
  { path: 'testvoice', component: TestvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
