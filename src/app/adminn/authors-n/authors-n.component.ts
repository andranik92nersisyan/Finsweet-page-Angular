import { environment } from 'src/environments/environments';
import { RequestService } from 'src/app/service/request.service';
import {  Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiistAuthors } from 'src/app/component/list-of-authors/list-of-authors.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors-n',
  templateUrl: './authors-n.component.html',
  styleUrls: ['./authors-n.component.css'],
})
export class AuthorsNComponent implements OnInit {

  btnclik: string = '';
  authorsForms: boolean = false;
  id: number = 0;
  displayedColumns: string[] = [
    'id',
    'img',
    'title',
    'text',
    'face',
    'twitt',
    'insta',
    'linke',
    'Action',
  ];
  formAuthorsUser: FormGroup = new FormGroup({});

  dataSource!: MatTableDataSource<LiistAuthors>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  row: LiistAuthors | undefined;

  constructor(private request: RequestService, public fm: FormBuilder) {}

  ngOnInit(): void {
    this.formAuthorsUser = this.fm.group({
      id: ['', Validators.required],
      img: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required],
      face: ['',  Validators.required],
      twitt: ['', Validators.required],
      insta: ['', Validators.required],
      linke: ['', Validators.required],
    });
    this.getLiistAuthors();
  }
  getLiistAuthors() {
    this.request.getData<LiistAuthors[]>(environment.listAuthorsUrl.get).subscribe(
      (item: LiistAuthors[]) => {
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
    this.authorsForms = !this.authorsForms;
    this.btnclik = 'Add';
    this.formAuthorsUser.reset();
  }
  editBlog(row: LiistAuthors) {
    this.row = row;
    this.btnclik = 'edit';
    this.formAuthorsUser.patchValue({
      img: row.img,
      text: row.text,
      title: row.title,
      face: row.face,
      twitt: row.twitt,
      insta: row.insta,
      linke: row.linke,
    });
    this.authorsForms = !this.authorsForms;
    this.id = row.id;
  }
  submit() {
    if (this.btnclik == 'Add' && this.formAuthorsUser.valid) {
      if (confirm('Do your really want to add new Autors')) {
        this.request
          .postData<LiistAuthors>(environment.listAuthorsUrl.get, this.formAuthorsUser.value)
          .subscribe(() => {
            this.getLiistAuthors();
            this.authorsForms = !this.authorsForms;
          });
      }
    } else if (this.btnclik == 'edit') {
      console.log('hello words');

      if (confirm('Do you really want to confirm the change?')) {
        this.request.putData<LiistAuthors>(`${environment.listAuthorsUrl.get}/${this.id}`, this.formAuthorsUser.value)
          .subscribe(() => {
            this.getLiistAuthors();
            this.authorsForms = !this.authorsForms;
          });
      }
    }
  }
  delate(id: number) {
    if (confirm('Do you want to delete?')) {
      this.request.deleteData(environment.listAuthorsUrl.get, id).subscribe(() => {
        this.getLiistAuthors();
      }, (e) => {
        console.log(e);
      });
    }
  }
  close() {
    this.authorsForms = !this.authorsForms;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
