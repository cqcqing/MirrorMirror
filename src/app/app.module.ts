import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatMenuModule, MatIconModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatToolbarModule, MatButtonModule, MatCheckboxModule
} from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import {LengthLimitPipe} from "./pipe/length-limit.pipe";
import { BatchComponent } from './batch/batch.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    SearchBarComponent,
    LengthLimitPipe,
    BatchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    TextFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
