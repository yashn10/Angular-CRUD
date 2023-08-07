import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  
  iseditclicked = "no";
  loginForm: FormGroup;
  loginList: any = [];
  index = ''


  constructor(private formbuilder: FormBuilder, private http: HttpClient) {

    this.loginForm = this.formbuilder.group({

      Email: [''],
      Password: [''],

    })

  }


  ngOnInit(): void {

    let data = localStorage.getItem('loginList');
    this.loginList = JSON.parse(data || '');
    console.log('loginList', this.loginList);

  }


  submit() {

    // this.http.post('', this.loginForm.value).subscribe(
    //   (response) => {
    //     console.log("response", response);
    //   },
    //   (error) => {
    //     console.log("error", error);
    //   }
    // )
    console.log(this.loginForm.value)
    this.loginList.push(this.loginForm.value)
    localStorage.setItem('loginList', JSON.stringify(this.loginList));

    this.clear()

  }


  edit(i: any) {

    this.loginForm.patchValue({

      Email: this.loginList[i].Email,
      Password: this.loginList[i].Password,

    })

    this.index = i;
    this.iseditclicked = "yes";

  }


  update() {

    this.loginList[this.index].Email = this.loginForm.value.Email;
    this.loginList[this.index].Password = this.loginForm.value.Password;
    localStorage.setItem('loginList', JSON.stringify(this.loginList));

    this.clear()
    this.iseditclicked = "no";

  }


  clear() {

    this.loginForm.reset()

  }


  delete(i: any) {

    this.loginList.splice(i, 1);
    localStorage.setItem('loginList', JSON.stringify(this.loginList));

  }


}