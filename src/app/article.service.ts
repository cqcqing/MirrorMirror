import {Injectable} from '@angular/core';
import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];
  private displayArticles: Article[] = [];
  private articlesMap = new Map(); // : { [key: number]: Article; } = {}; //  Array.from(map)把图转成数组，用来更新articles
  private allList: Array<number> = []; // 批量操作时所有可选项目的id（createTime）
  filterText = "";
  isBatch = false; // 是否在批量编辑页面
  isAllSelect = false; // 是否全选
  selected: Array<number> = []; // 被选中的项目的id（createTime）

  constructor() {
    for (let i = 0; i < localStorage.length; i++) {
      const article: Article = JSON.parse(localStorage.getItem(localStorage.key(i)));
      this.articles.push(article);
      this.articlesMap.set(article.createTime, article);
    }
    this.displayArticles = this.articles;

  }

  getArticles() {
    return this.articles;
  }

  getArticle(id: number) {
    return JSON.parse(localStorage.getItem(id.toString()));
  }

  deleteArticle(id: number) {
    localStorage.removeItem(id.toString());
    this.articlesMap.delete(id);
    //  更新articles
    this.articles = [...this.articlesMap.values()];
    //  更新陈列用文章displayArticles
    this.displayArticles = this.articles;
  }

  setArticle(article: Article) {
    localStorage.setItem(article.createTime.toString(), JSON.stringify(article));
    this.articlesMap.set(article.createTime, article);
    //  更新articles
    this.articles = [...this.articlesMap.values()];
    //  更新陈列用文章displayArticles
    this.displayArticles = this.articles;
  }

  getDisplayArticles() {
    //  获取陈列用文章
    // console.log("_________更新频率"); // angular的数据绑定实时更新原理是啥，绑定一个函数会怎样？
    // *ngFor="let article of articleService.getDisplayArticles()"这种也是数据绑定，ngfor也监听吗？原理是啥？
    // angular模板绑定是通过 property 和事件来工作的
    // *ngFor是angular内置结构型指令
    return this.displayArticles.reverse();
  }

  setDisplayArticles(articles: Article[]) {
    //  设置陈列用文章
    this.displayArticles = articles;
  }

  /**获取时间戳，用时间戳做article的唯一标识
   */
  getTimestamp() {
    const date = new Date();
    const timestamp = date.getTime(); // 获取当前时间(从1970.1.1开始的毫秒数)
    return timestamp;
  }

  /**时间戳转日期
   * @param timestamp 时间戳
   * */
  timestampToDate(timestamp: number) {
    const date = new Date(timestamp).toLocaleString().replace(/\//g, "-");
    return date;
  }

  getAllList() {
    this.allList = [...this.articlesMap.keys()];
  }

  // '单选框'点击事件
  selectItem(item) {
    this.updateSelected(item);
  }

  // 判断'单选框'的checked
  isSelected(item: number) {
    return this.selected.findIndex(value => value === item) >= 0;
  }

  // '全选'点击事件
  selectAll() {
    if (this.isAllSelect) {
      this.selected = [];
      this.isAllSelect = false;
    } else {
      this.selected = [...this.allList];
      this.isAllSelect = true;
    }
  }

  // 判断是否全选
  isAllSelected() {
    this.isAllSelect = this.isContained(this.selected, this.allList);
  }

  //  执行增加、删除
  private updateSelected(item) {
    if (this.selected.findIndex(value => value === item) === -1) { // 不存在则增加
      this.selected.push(item);
    } else { // 已经存在则删除
      this.selected.splice(this.selected.findIndex(value => value === item), 1);
    }
    this.isAllSelected();
  }

  // 判断b数组是否包含在a数组中
  private isContained(a, b) {
    if (!(a instanceof Array) || !(b instanceof Array)) {
      return false;
    }
    if (a.length < b.length) {
      return false;
    }
    if (b.length === 0) {
      return false;
    }
    const aStr = a.toString();
    for (let i = 0, len = b.length; i < len; i++) {
      if (aStr.indexOf(b[i]) === -1) {
        return false;
      }
    }
    return true;
  }

}
