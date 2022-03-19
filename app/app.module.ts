import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GenderPipe } from './shared/pipe/gender.pipe';
import { PagerService } from './shared/pager.service';
import { FilterDataPipe } from './shared/pipe/filter-data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    GenderPipe,
    FilterDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
