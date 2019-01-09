import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {MainComponent} from "./main/main.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {BatchComponent} from "./batch/batch.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'article/:id', component: ArticleDetailComponent},
  {path: 'article', component: ArticleDetailComponent},
  {path: 'search', component: SearchBarComponent},
  {path: 'batch', component: BatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
