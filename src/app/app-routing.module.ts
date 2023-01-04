import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { AboutComponent } from './views/about/about.component';

const routes: Routes = [
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
  },
  { path: 'about', component: AboutComponent },
  {
    path: '', component: ContactIndexComponent, children: [
      { path: 'edit/:id', component: ContactEditComponent },
      { path: 'edit', component: ContactEditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), HttpClientModule,],

  exports: [RouterModule]
})
export class AppRoutingModule { }
