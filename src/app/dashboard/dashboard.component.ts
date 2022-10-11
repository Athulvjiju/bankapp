import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user=""

  acnum=""
  pswrd=""
  amnt=""

  acnum1=""
  pswrd1=""
  amnt1=""

  cno:any



  dashboardForm=this.fb.group({
   
    acnum:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pswrd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
    // amnt:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]


  })

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.user=this.ds.currentUser
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
  }
  deposit(){
    var acnum=this.acnum
    var pswrd=this.pswrd
    var amnt=this.amnt

    const result=this.ds.deposit(acnum,pswrd,amnt)
     if(result){
      alert(`${amnt} is credited, new balance is ${result}`)
     }
    
  }
  withdraw(){
    var acnum=this.acnum1
    var pswrd=this.pswrd1
    var amnt=this.amnt1

    const result=this.ds.deposit(acnum,pswrd,amnt)
     if(result){
      alert(`${amnt} is debited, new balance is ${result}`)
     }


  }


  logout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    this.router.navigateByUrl('')
  }

  deleteconfirm(){
    this.cno=JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  

}