import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim='your perfect banking partner'
  acnt='Enter your accout number'

  acno=''
  psw=''

  loginForm=this.fb.group({
   
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]

  })



  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    var acnum=this.loginForm.value.acno
    var psw=this.loginForm.value.psw

   const result= this.ds.login(acnum,psw)
   if(this.loginForm.valid){
   if(result){
    alert('login success')
    this.router.navigateByUrl('dashboard')
   }
  }
  else{
    alert('invalid form')
  }
 






}




}