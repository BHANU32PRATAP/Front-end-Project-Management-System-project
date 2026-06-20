import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  userDetails: any = {}

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem("userData") || "{}")
    console.log(this.userDetails)
  }




}
