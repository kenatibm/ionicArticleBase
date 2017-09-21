export class Article {
    public id:number;
    public title: string;
    public category: string;
    public favorite: boolean;
    public url: string;
    public createdDate: Date;
    public updateDate: Date;

    constructor(){
        this.id = 0;
        this.createdDate = new Date();
        this.favorite = false;
    }
}