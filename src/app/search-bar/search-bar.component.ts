import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ArticleService} from "../article.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef; // 搜索框
//   displayedColumns: string[] = ['id', 'flag', 'summary', 'updateTime'];
  dataSource = null;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private location: Location, public articleService: ArticleService) {
    this.dataSource = new MatTableDataSource(this.articleService.getArticles());
  }

  ngOnInit() {
    this.filter.nativeElement.value = this.articleService.filterText;
    this.applyFilter(this.articleService.filterText);
    this.filter.nativeElement.focus();
  }

  goBack() {
    this.clearFilter(); // 先清除过滤
    this.location.back();
  }

  /**清空搜索字段*/
  clearFilter() {
    this.filter.nativeElement.value = '';
    this.filter.nativeElement.focus();
    this.applyFilter("");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.articleService.filterText = filterValue;
    this.articleService.setDisplayArticles(this.dataSource.filteredData);
  }

}
