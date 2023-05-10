import { JoinNew } from 'src/app/component/join-now/join-now.component';
import { environment } from './../../../environments/environments';
import { Component, OnInit } from '@angular/core';
import { ChooseName } from 'src/app/component/choose-catagory/choose-catagory.component';
import { LiistAuthors } from 'src/app/component/list-of-authors/list-of-authors.component';
import { RequestService } from 'src/app/service/request.service';
import { BlogPost } from 'src/app/component/all-post/all-post.component';
import { FeatPost } from 'src/app/component/featured/featured.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
chooseName: ChooseName[] = [];
listAuthors: LiistAuthors[] = [];
blogPost: BlogPost[] = [];
featPost: FeatPost[] = [];
joinNew: JoinNew[] = [];
  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.setChooseName();
    this.setListAutors();
    this.setBlogPost();
    this.setFeatpost();
    this.getJoinNew();
  }
  setChooseName() {
    this.request.getData<ChooseName []>(environment.chooseNameUrl.get).subscribe((item) => {
        this.chooseName = item;
      });
  }

  setListAutors(){
    this.request.getData<LiistAuthors []>(environment.listAuthorsUrl.get + '?_limit=4').subscribe((items) =>{
      this.listAuthors = items
    })
  }
  setBlogPost() {
    this.request.getData<BlogPost[]>(environment.blogPostUrl.get + '?_limit=4').subscribe((items) => {
      this.blogPost = items
    })
  }
  setFeatpost() {
    this.request.getData<FeatPost[]>(environment.featPostUrl.get).subscribe((item) => {
      this.featPost = item
    })
  }

  getJoinNew(){
    this.request.getData<JoinNew[]>(environment.joinNewUrl.get).subscribe((item) => {
      this.joinNew = item;
    })
  }

}





