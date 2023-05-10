import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/component/all-post/all-post.component';
import { ChooseName } from 'src/app/component/choose-catagory/choose-catagory.component';
import { JoinNew } from 'src/app/component/join-now/join-now.component';
import { RequestService } from 'src/app/service/request.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  joinNew: JoinNew[] = [];
  chooseName: ChooseName[] = [];
  blogPost: BlogPost[] = [];
  i: number =1;
  Xtotal: number = 1
  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.getChooseName();
    this.getBlogPost();
    this. getJoinNew();
    this.lengtAllPosts();
  }
  getChooseName() {
    this.request.getData<ChooseName []>(environment.chooseNameUrl.get).subscribe((item) => {
        this.chooseName = item;
      });
  }

  getBlogPost() {
    this.request.getData<BlogPost []>(environment.blogPostUrl.get + `?_page=${this.i}&_limit=5`).subscribe((item) => {
      this.blogPost = item;
    });
  }


  getJoinNew(){
    this.request.getData<JoinNew[]>(environment.joinNewUrl.get).subscribe((item) => {
      this.joinNew = item;
    })
  }

  lengtAllPosts(){
    this.request.getAdminDatas<BlogPost[]>(environment.blogPostUrl.get + `?_page=${this.i}&_limit=5`).subscribe((item)=> {
      if(item.body !== null) {
        this.blogPost = item.body
        this.Xtotal = Number(item.headers.get('X-Total-Count'))
      }
    })
  }
  nextPage(){
    if(this.i < this.Xtotal/5){
      ++this.i
      this.lengtAllPosts()
      console.log(this.blogPost);
    }
  }
  prewPage() {
    if(this.i > 1) {
      this.i--
      this.getBlogPost();
    }
  }
}
