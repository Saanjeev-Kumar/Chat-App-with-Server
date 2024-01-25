import { ASTWithSource } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bool= false

  fullName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-z]+([\s][a-zA-Z]+)+$/)]);
  username = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/),
  ]);
  gender = new FormControl('', [Validators.required]);
  registerForm!: FormGroup

  constructor( private fb: FormBuilder, private service: ServicesService) { 
    this.registerForm = this.fb.group({
      fullName: this.fullName,
      username: this.username,
      password: this.password,
      gender: this.gender
  })
}

  ngOnInit(): void {
  }

  register(){
    const newUser = {
      fullName: this.registerForm.value.fullName,
      userName: this.registerForm.value.username,
      password: this.registerForm.value.password,
      gender: this.registerForm.value.gender,
     }
    this.service.postUser(newUser).subscribe(data =>{
      console.log(data)
      this.bool = true;
      this.registerForm.reset();
    })
  }
}
