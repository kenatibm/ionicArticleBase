import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { ArticleProvider } from '../../providers/article/article';
import { Article } from '../../models/article';

@IonicPage({
  name: 'articleList'
})
@Component({
  selector: 'page-article-list',
  templateUrl: 'article-list.html',
})
export class ArticleListPage {

  allArticles: Article[];
  statusCode: number;
  searchTerm: string;
  searchControl: FormControl;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  }; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private articleProvider: ArticleProvider,
    private browser: InAppBrowser) {

      this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.setFilteredItems();
    });
  }

  ionViewDidEnter() {
    this.getAllArticles(0);
  }

  getAllArticles(refresher) {
    this.searchTerm = "";
    this.articleProvider.getAllArticles()
      .subscribe(
        data => {
          this.allArticles = data;
          if(refresher != 0) {
            refresher.complete();
          }
        },
        errorCode => this.statusCode = errorCode
      );
  }

  addArticle() {
    this.navCtrl.push('detail', {article: new Article()});
  }

  editArticle(value:Article){
    this.navCtrl.push('detail', {article: value});
  }

  deleteArticle(articleId) {
    this.statusCode = null;
    this.articleProvider.deleteArticle(articleId)
      .subscribe(article => {
        this.statusCode = 204;
        this.getAllArticles(0);
      }, errorCode => {
        this.statusCode = errorCode
      });
  }

  setFilteredItems() {    
    if(this.searchTerm && this.searchTerm.trim() != '') {
      this.allArticles = this.allArticles.filter(( item ) => {
        console.log(`==> SEARCH: ${item.title} ${this.searchTerm}`);
        return (item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
      });
    } else {
      this.getAllArticles(0);
    }
  }

  visitURL(url: string) {
    console.log(`==> Visit URL: ${url}`);
    let target = "_system";
    this.browser.create(url, target, this.options);
  }
  
}
