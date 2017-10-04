import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { ArticleProvider } from '../../providers/article/article';

import { Article } from '../../models/article';

@IonicPage({
  name: "detail"
})
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {

  article: Article;
  statusCode: number;
  articleForm: FormGroup;
 
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
    private formBuidler:FormBuilder,
    private browser: InAppBrowser) {
      this.article = this.navParams.get("article");
      console.log(`==> Article: ${JSON.stringify(this.article)}`);

      this.articleForm = this.formBuidler.group({
        title: [this.article.title, Validators.compose([Validators.required])],
        categories: [this.article.category],
        url: [this.article.url, Validators.compose([Validators.required, Validators.pattern('^(http|https):\/\/[^ "]+$')])],
        favorite: [this.article.favorite]
      });

      this.initForm();
  }

  initForm() {
    this.articleForm.controls["title"].valueChanges.subscribe (data => {
      this.article.title = data;
    });

    this.articleForm.controls["url"].valueChanges.subscribe ( data=> {
      this.article.url = data;
    });

    this.articleForm.controls["categories"].valueChanges.subscribe( data=> {
      this.article.category = data;
    });

    this.articleForm.controls["favorite"].valueChanges.subscribe( data=> {
      console.log(`==> FAVORITE: ${data}`);
      this.article.favorite = data;
      if(this.article.id != 0) {
        this.updateArticle();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailPage');
  }

  save() {    
    if(this.article.id == 0) {
      this.createArticle();
    } else {
      this.updateArticle();
      this.navCtrl.pop();
    }
  }

  private createArticle() {
    this.articleProvider.createArticle(this.article)
    .subscribe(data => {
      this.articleProvider.getAllArticles();
      this.navCtrl.pop();
    }, error => {
      console.log(`==> CREATE ERROR: ${JSON.stringify(error)}`);
    });
  }

  private updateArticle(): any {
    this.articleProvider.updateArticle(this.article)
      .subscribe(data => {
        this.articleProvider.getAllArticles();
    }, error => {
      console.log(`==> CREATE ERROR: ${JSON.stringify(error)}`);
    });
  }

  visitURL(){
    console.log(`==> Visit URL: ${this.article.url}`);
    this.browser.create(this.article.url, "_system", this.options);
  }
}
