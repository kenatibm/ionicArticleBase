import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Article } from '../../models/article';

@Injectable()
export class ArticleProvider {
  articleURL = "http://localhost:3000/articles";
  private cpHeaders = new Headers({ 'Content-Type' : 'application/json'});
  private options = new RequestOptions ({ headers : this.cpHeaders });

  constructor(public http: Http) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get(this.articleURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createArticle(article:Article): Observable<number> {  
    console.log(`==> createArticle: ${JSON.stringify(article)}`);
    return this.http.post( this.articleURL, article, this.options)
      .catch(this.handleError);
  }

  getArticleById(articleId: number): Observable<Article> {
    return this.http.get(`${this.articleURL}/${articleId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateArticle(article:Article): Observable<number> {
    article.updateDate = new Date();
    var url = this.articleURL + "/" + article.id;
    console.log(`==> updateArticle: ${JSON.stringify(this.options)} `);
    
    this.options.body = article;
    this.options.method = "PUT";
    return this.http.put(url, article)
      .catch(this.handleError)
  }

  deleteArticle(articleId:number): Observable<number> {
    return this.http.delete(`${this.articleURL}/${articleId}`)
      .map(success => success.status)
      .catch(this.handleError)
  }

  private extractData(res:Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
