import { RequestService } from 'src/app/service/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Token {
  token?: string;
  error?: string;
}

interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    public fb: FormBuilder,
    private request: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9a-zA-Z\-_\.]{1,}@[a-zA-Z0-9]{1,}\.[a-zA-Z]{2,4}$/
          ),
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }

  // isLogined() {
  //   if (this.request.isLogined()) {
  //     this.router.navigate(['admin']);
  //   }
  // }

  submit() {
    this.request
      .login<Token>('https://reqres.in/api/login', this.loginForm.value)
      .subscribe(
        (items: Token) => {
          if ('token' in items && items.token != undefined) {
            this.request.setToken(items.token);
            this.router.navigate(['admin']);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}
