import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";
import {Article} from "../article";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(public articleService: ArticleService) {
    this.articles = this.articleService.getArticles();

  }

  ngOnInit() {
  }
}
