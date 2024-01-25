import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bool: boolean = false
  hide: boolean = false;

  validateData: any
  matchPassword: boolean = false;

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/),
  ]);
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private service: ServicesService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password,
    })
  }

  ngOnInit(): void {
  }



  login() {
    this.service.getUserDetails(this.loginForm.value.email).subscribe((data) => {
      
      this.validateData = data;

      if (this.validateData &&
        this.validateData[0].password === this.loginForm.value.password
      ) {
        localStorage.setItem("username",this.validateData[0].fullName)
        this.router.navigate(['/chat-room']);
      } else {
        alert('Give Valid Credential.!');
        this.matchPassword = true;
      }
    });
  }



}
