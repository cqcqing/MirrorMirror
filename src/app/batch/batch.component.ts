import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor(private location: Location, public articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.isBatch = true; // 更改状态
    this.articleService.getAllList(); // 初始化allList数组
  }

  goBack() {
    this.articleService.selected = []; // 清空seleted数组
    this.articleService.isBatch = false; // 还原状态
    this.articleService.isAllSelect = false; // 还原状态
    this.location.back();
  }

  deleteArticles() {
    // 有空加一个弹出框确认删除。。。。。。。。
    const arr = this.articleService.selected;
    for (let i = 0; i < arr.length; i++) {
      this.articleService.deleteArticle(arr[i]);
    }
    this.goBack();
  }

}
