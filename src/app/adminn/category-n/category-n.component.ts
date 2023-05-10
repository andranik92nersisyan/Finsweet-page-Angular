import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChooseName } from 'src/app/component/choose-catagory/choose-catagory.component';
import { RequestService } from 'src/app/service/request.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-category-n',
  templateUrl: './category-n.component.html',
  styleUrls: ['./category-n.component.css'],
})
export class CategoryNComponent implements OnInit {
  btnclik: string = '';
  categoryForms: boolean = false;
  id: number = 0;
  displayedColumns: string[] = ['id', 'img', 'title', 'categorytext', 'Action'];
  categoryFormsUser: FormGroup = new FormGroup({});

  dataSource!: MatTableDataSource<ChooseName>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  row: ChooseName | undefined;

  constructor(private request: RequestService, public fm: FormBuilder) {}

  ngOnInit(): void {
    this.categoryFormsUser = this.fm.group({
      id: ['', Validators.required],
      img: ['', Validators.required],
      title: ['', Validators.required],
      categorytext: ['', Validators.required],
    });
    this.getChooseName();
  }
  getChooseName() {
    this.request.getData<ChooseName[]>(environment.chooseNameUrl.get).subscribe(
      (item) => {
        this.dataSource = new MatTableDataSource(item);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (e) => {
        alert('Error');
      }
    );
  }
  addBlog() {
    this.categoryForms = !this.categoryForms;
    this.btnclik = 'Add';
    this.categoryFormsUser.reset();
  }
  editBlog(row: ChooseName) {
    this.row = row;
    this.btnclik = 'edit';
    this.categoryFormsUser.patchValue({
      img: row.img,
      title: row.title,
      categorytext: row.categorytext,
    });
    this.categoryForms = !this.categoryForms;
    this.id = row.id;
  }
  submit() {
    if (this.btnclik == 'Add') {
      if (confirm('Do your really want to add new Autors')) {
        this.request
          .postData<ChooseName>(environment.chooseNameUrl.get, this.categoryFormsUser.value)
          .subscribe(() => {
            this.getChooseName();
            this.categoryForms = !this.categoryForms;
          });
      }
    } else if (this.btnclik == 'edit') {
      console.log('Please select');
      if (confirm('Do you really want to confirm the change?')) {
        this.request
          .putData<ChooseName>(
            `${environment.chooseNameUrl.get}/${this.id}`,
            this.categoryFormsUser.value
          )
          .subscribe(() => {
            this.getChooseName();
            this.categoryForms = !this.categoryForms;
          });
      }
    }
  }
  delate(id: number) {
    if (confirm('Are you sure you want to delete this')) {
      this.request.deleteData(environment.chooseNameUrl.get, id).subscribe(() => {
        this.getChooseName();
      }, (e) => {
        console.log(e);
      });
    }
  }
  close() {
    this.categoryForms = !this.categoryForms;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
