import { Component, OnInit } from '@angular/core';
import { JoinNew } from 'src/app/component/join-now/join-now.component';
import { LiistAuthors } from 'src/app/component/list-of-authors/list-of-authors.component';
import { RequestService } from 'src/app/service/request.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  listAuthors: LiistAuthors[] = []
  joinNew: JoinNew[] = [];

  ngOnInit(): void {
    this.setListAutors()
    this.getJoinNew()
  }

  constructor(private request: RequestService){}
  setListAutors(){
    this.request.getData<LiistAuthors []>(environment.listAuthorsUrl.get).subscribe((items) =>{
      this.listAuthors = items
    })
  }

  getJoinNew(){
    this.request.getData<JoinNew[]>(environment.joinNewUrl.get).subscribe((item) => {
      this.joinNew = item;
    })
  }

}
