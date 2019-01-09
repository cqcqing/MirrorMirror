import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article.service";
import {Article} from "../article";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  @ViewChild('text') text: ElementRef;
  id: number;
  article: Article = {
    title: "",
    text: "",
    summary: "",
    createTime: 0,
    createDate: "",
    lastModified: 0,
    lastModifiedDate: "",
  };

  constructor(private location: Location, private route: ActivatedRoute, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  goBack() {
    this.setArticle(this.title.nativeElement.value.trim(), this.text.nativeElement.value);
    this.location.back();
  }

  getArticle() {
    if (this.id === 0) {
      // 建一个空白内容页
      this.article.title = "";
      this.article.text = "";
      this.article.summary = "";
      this.article.createTime = this.articleService.getTimestamp();
      this.article.createDate = this.articleService.timestampToDate(this.article.createTime);
      this.article.lastModified = this.articleService.getTimestamp();
      this.article.lastModifiedDate = this.articleService.timestampToDate(this.article.createTime);
    } else {
      this.article = this.articleService.getArticle(this.id);
    }
  }

  setArticle(title: any, text: any) {
    if (title === "" && text === "") {
      return;
    }
    this.article.title = title.trim() || "系统分配标题";
    this.article.text = text;
    this.article.summary = text.substr(0, 10);
    this.article.lastModified = this.articleService.getTimestamp();
    this.article.lastModifiedDate = this.articleService.timestampToDate(this.article.lastModified);
    this.articleService.setArticle(this.article);
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.id);
    this.location.back();
  }

  // 限制文章标题长度不能超过10
  sliceTitle(str: string) {
    this.article.title = str.slice(0, 10);
    this.title.nativeElement.value = this.article.title;
  }

}
