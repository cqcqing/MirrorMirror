import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  // 跳转到搜索页面
  toSearchTool() {
    this.router.navigateByUrl("search");
  }

  // 跳转到批量处理页面
  toBatchTool() {
    this.router.navigateByUrl("batch");
  }

  // 跳转到articleDetail页面(空白页，不传id)（绝对路径）
  newArticle() {
    this.router.navigateByUrl("article");
  }

}
