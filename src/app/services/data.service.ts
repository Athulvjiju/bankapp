import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any
  currentAcno:any

  userDetails:any={
    1000:{acno:1000,username:"amal",password:123,balance:100000,transaction:[]},
    1001:{acno:1001,username:"ammu",password:123,balance:200000,transaction:[]},
    1002:{acno:1002,username:"anu",password:123,balance:150000,transaction:[]},
    1004:{acno:1003,username:"joel",password:123,balance:150000,transaction:[]}
  }

  constructor() {
    this.getDetails()
   }


  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('database',JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))

  }
}

  getDetails(){
    if(localStorage.getItem('database')){
      this.userDetails=JSON.parse(localStorage.getItem('database') || '')
    }
    if(localStorage.getItem('currentuser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser') || '')
    }
    if(localStorage.getItem('currentacno')){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno') || '')
    }
  }


  register(acno:any,username:any,password:any){
    let userDetails=this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
      console.log(userDetails);
      
      this.saveDetails()
      return true
    }

  }
  login(acnum:any,psw:any){
   
    let userDetails=this.userDetails
    if(acnum in userDetails){
      if(psw==userDetails[acnum]['password']){
        this.currentUser=userDetails[acnum]['username']
        this,this.currentAcno=acnum

        this.saveDetails()
        return true
      

      }
      else{
        alert('incorrect password')

        return false
      }
    }
    else{
      alert('user is not exist incurrent ac number')
      return false
    }
  }

  deposit(acnum:any,pswrd:any,amnt:any){
    let userDetails=this.userDetails
    var amount=parseInt(amnt)   //convert to int

    if(acnum in userDetails){
      if(pswrd==userDetails[acnum]['password']){
        userDetails[acnum]['balance']+=amount
        userDetails[acnum]['transaction'].push({type:'CREDIT',amount})

        this.saveDetails()
        return userDetails[acnum]['balance']
      }
      else{
        alert('incorrect password')
      }
    }
    else{
      alert('user not exisits')
      return false
    }
  }

  withdraw(acnum:any,pswrd:any,amnt:any){
    let userDetails=this.userDetails
    var amount=parseInt(amnt)   //convert to int

    if(acnum in userDetails){
      if(pswrd==userDetails[acnum]['password']){
        if(userDetails[acnum]['balance']>=amnt){
        userDetails[acnum]['balance']-=amount
        userDetails[acnum]['transaction'].push({type:'DEBIT',amount})

        this.saveDetails()
        return userDetails[acnum]['balance']
        }
        else{
          alert('insufficent balance')
          return false
        }
      }
      else{
        alert('incorrect password')
      }
    }
    else{
      alert('user not exisits')
      return false
    }
  }

getTransaction(acno:any){
  return this.userDetails[acno]['transaction']
}




}