import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlogPost } from 'src/app/component/all-post/all-post.component';
import { RequestService } from 'src/app/service/request.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.css'],
})
export class PostAllComponent implements OnInit {
  btnclik: string = '';
  postForms: boolean = false;
  id: number = 0;
  displayedColumns: string[] = [
    'img',
    'text',
    'title',
    'textUs',
    'dataText',
    'dataSpanText',
    'Action',
  ];
  formPostUser: FormGroup = new FormGroup({});

  dataSource!: MatTableDataSource<BlogPost>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  row: BlogPost | undefined;

  constructor(private request: RequestService, public fm: FormBuilder) {}

  // ngAfterViewInit(): void {
  // }

  ngOnInit(): void {
    this.formPostUser = this.fm.group({
      img: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      textUs: ['', Validators.required],
      dataText: ['', Validators.required],
      dataSpanText: ['', Validators.required],
    });
    this.getBlogPost();
  }
  getBlogPost() {
    this.request.getData<BlogPost[]>(environment.blogPostUrl.get).subscribe(
      (item) => {
        this.dataSource = new MatTableDataSource(item);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (e) => {
        alert(e);
      }
    );
  }
  addBlog() {
    this.postForms = !this.postForms;
    this.btnclik = 'Add';
    this.formPostUser.reset();
  }
  editBlog(row: BlogPost) {
    this.row = row;
    this.btnclik = 'edit';
    this.formPostUser.patchValue({
      img: row.img,
      text: row.text,
      title: row.title,
      textUs: row.textUs,
      dataText: row.dataText,
      dataSpanText: row.dataSpanText,
    });
    this.postForms = !this.postForms;
    this.id = row.id;
  }
  submit() {
    if (this.btnclik == 'Add' && this.formPostUser.valid) {
      if (confirm('Do your really want to add new Autors')) {
        this.request
          .postData<BlogPost>(environment.blogPostUrl.get, this.formPostUser.value)
          .subscribe(() => {
            this.getBlogPost();
            this.postForms = !this.postForms;
          });
      }
    } else if (this.btnclik == 'edit') {
      console.log('hello');
      if (confirm('Do you really want to confirm the change?')) {
        this.request
          .putData<BlogPost>(
            `${environment.blogPostUrl.get}/${this.id}`,
            this.formPostUser.value
          )
          .subscribe((blogpost) => {
            this.getBlogPost();
            this.postForms = !this.postForms;
          });
      }
    }
  }
  delatebtn(id: number) {
    if (confirm('Do you want to delete this')) {
      this.request.deleteData(environment.blogPostUrl.get, id).subscribe(() => {
        this.getBlogPost();
      });
    }
  }
  close() {
    this.postForms = !this.postForms;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
