import { RequestService } from './../../service/request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/component/all-post/all-post.component';
import { JoinNew } from 'src/app/component/join-now/join-now.component';
import { environment } from 'src/environments/environments.prot';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit{
  blogPost: BlogPost[] = [];
  joinNew: JoinNew[] = [];

  postsId: number = this.activeRoute.snapshot.params['id'];
  constructor(private request: RequestService, public activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.getBlogPostData();
    this. getJoinNew();
  }


// getBlogPost(){
//   this.request.getData<BlogPost[]>(environment.blogPost.get).subscribe((item) => {
//     this.blogPost = item
//   })
// }

  getBlogPostData(){
    this.request.getData<BlogPost[]>(`${environment.blogPostUrl.get}/${this.postsId}`).subscribe((data) =>{
      this.blogPost = Array.isArray(data) ? data : [data];
    })
  }

  getJoinNew(){
    this.request.getData<JoinNew[]>(environment.joinNewUrl.get).subscribe((item) => {
      this.joinNew = item;
    })
  }
}
