import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PinHome-Dashboard';
  constructor(){
    console.log("Page logged");
    
  }

  show1(event){
    console.log(event);
    document.getElementById("one").style.display = "block"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "none"
  }
  show2(){
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "block"
    document.getElementById("three").style.display = "none"
  }
  show3(){
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "block"
  }
}
