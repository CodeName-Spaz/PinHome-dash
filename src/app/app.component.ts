import { Component } from '@angular/core';
declare var firebase;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PinHome-Dashboard';
  organizationArr =  new Array();
  constructor(){
    console.log("Page logged");
    
  }
  orph = 0;
  disablty = 0;
  oldAge = 0;
  theraphy = 0;
  Psychiatric = 0;
  sCenter = 0;
  Rehab = 0;
  getAllcat(){
    for (var x = 0; x < this.organizationArr.length; x++){
        if (this.organizationArr[x].category == "Orphanage"){
          this.orph++
        }
        else if (this.organizationArr[x].category == "Disability"){
          this.disablty++;
        }
        else if (this.organizationArr[x].category == "old age"){
          this.oldAge++;
        }
        else if (this.organizationArr[x].category =="theraphy"){
          this.theraphy++;
        }
        else if (this.organizationArr[x].category == "Psychiatric"){
          this.Psychiatric++;
        }
        else if (this.organizationArr[x].category == "social centre"){
          this.sCenter++;
        }
        else if (this.organizationArr[x].category == "Rehab"){
          this.Rehab++;
        }
    }
    console.log(this.Rehab);
    
  }

  assignData(x) {
    this.organizationArr.push(x);
  }
  ngOnInit() {

    firebase
      .database()
      .ref("Websiteprofiles/")
      .on("value", (data: any) => {
        if (data.val() != null || data.val() != undefined) {
          var DisplayData = data.val();
          var keys = Object.keys(DisplayData);
          for (var x = 0; x < keys.length; x++) {
            firebase
              .database()
              .ref("Websiteprofiles/" + keys[x])
              .on("value", (data2: any) => {
                var orgs = data2.val();
                var keys2 = Object.keys(orgs);
                for (var i = 0; i < keys2.length; i++) {
                  this.assignData(orgs[keys2[i]]);
                }
              });
          }
        }
        this.getAllcat()
      });
  }

  show1(event){
    console.log("clicked");
    document.getElementById("one").style.display = "block"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "none"
  }
  show2(event){
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "block"
    document.getElementById("three").style.display = "none"
  }
  show3(event){
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "block"
  }
}
