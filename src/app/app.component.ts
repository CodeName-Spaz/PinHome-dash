import { Component } from '@angular/core';
import { Chart } from "chart.js";
import * as moment from 'moment';
declare var firebase;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PinHome-Dashboard';
  organizationArr = new Array();
  orph = 0;
  disablty = 0;
  oldAge = 0;
  theraphy = 0;
  Psychiatric = 0;
  sCenter = 0;
  Rehab = 0;
  orgs = 0;
  chart = [];
  allDates = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor() {
    console.log("Page logged");

  }

  getAllcat() {
    for (var x = 0; x < this.organizationArr.length; x++) {
      this.orgs++;
      if (this.organizationArr[x].category == "Orphanage") {
        this.orph++
      }
      else if (this.organizationArr[x].category == "Disability") {
        this.disablty++;
      }
      else if (this.organizationArr[x].category == "old age") {
        this.oldAge++;
      }
      else if (this.organizationArr[x].category == "theraphy") {
        this.theraphy++;
      }
      else if (this.organizationArr[x].category == "Psychiatric") {
        this.Psychiatric++;
      }
      else if (this.organizationArr[x].category == "social centre") {
        this.sCenter++;
      }
      else if (this.organizationArr[x].category == "Rehab") {
        this.Rehab++;
      }
    }
    this.loadChart();

  }
  loadChart() {
    Chart.defaults.global.defaultFontColor = 'white';
    this.chart = new Chart("Overall", {
      type: 'doughnut',
      data: {
        labels: ["Disability", "Orphanage", "Psychiatric centres/Hospital", "Rehab", "Old Age Homes", "Social Centre", "Theraphy"],
        datasets: [{
          label: 'Number of Orgs',
          data: [this.disablty, this.orph, this.Psychiatric, this.Rehab, this.oldAge, this.sCenter, this.theraphy],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(20, 162, 70, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(20, 162, 70, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  assignData(x) {
    this.organizationArr.push(x);
  }

  cities = new Array();
  tempCities = new Array();
  SignCities(city) {
    
    var results = "";
    for (var x = 0; x < this.cities.length; x++) {
      if (this.cities[x] == city) {
        results = "found";
        break
      }
    }
    if (results != "found") {
      this.cities.push(city);
    }
    this.tempCities.push(city);
  }

  views = new Array();
  viewsNum = new Array();
  getOrgsViews() {
    firebase.database().ref("catViews/").on("value", (data: any) => {
        var out = data.val();
        var keys = Object.keys(out);
        for (var x = 0; x < keys.length; x++) {
          firebase.database().ref("catViews/" + keys[x]).on("value", (data2: any) => {
              var details = data2.val();
              var k = Object.keys(details);
              this.views.push(keys[x]);
              this.viewsNum.push(details[k[0]].views)
            })
        }
        this.viewsChart();
      })
  }


  viewsChart() {
    this.chart = new Chart("views", {
      type: 'pie',
      data: {
        labels: this.views,
        datasets: [{
          label: 'Total Views per Organizations',
          data: this.viewsNum,
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(20, 162, 70, 1)',
            'rgba(255, 159, 40, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(20, 162, 70, 1)',
            'rgba(255, 159, 40, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  ngOnInit() {
    this.getProfiles();
    this.getOrgsViews();
    firebase.database().ref("Websiteprofiles/").on("value", (data: any) => {
        if (data.val() != null || data.val() != undefined) {
          this.cities.length = 0;
          this.cityValues.length = 0;
          this.tempCities.length = 0;
          this.orgs = 0;
          this.disablty = 0;
          this.oldAge = 0;
          this.theraphy = 0;
          this.Psychiatric = 0;
          this.Rehab = 0;
          this.sCenter = 0;
          this.dates.length = 0;
          this.tempDates.length = 0;
          this.datesValues.length = 0;
          this.showDates.length = 0;
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
                  this.SignCities(orgs[keys2[i]].city)
                  this.stroreDates(moment(orgs[keys2[i]].date, 'MMMM Do YYYY, h:mm:ss a').format('MMMM'))
                }
              });
          }
        }
        this.getAllcat()
        this.loadDatesChart();
        this.countCities();
        this.countDates();
      });
  }

  dates = new Array();
  tempDates = new Array();
  stroreDates(date) {
    var results = "";
    for (var x = 0; x < this.dates.length; x++) {
      if (this.dates[x] == date) {
        results = "found";
        break
      }
    }
    if (results != "found") {
      this.dates.push(date);
    }
    this.tempDates.push(date);
  }

  datesValues = new Array();
  showDates = new Array();
  countDates() {
    for (var x = 0; x < this.dates.length; x++) {
      var value = 0;
      var state = false;
      for (var i = 0; i < this.tempDates.length; i++) {
        if (this.allDates[x] == this.tempDates[i]) {
          value++;
          state = true;
        }
      }
      if (state == true) {
        this.datesValues.push(value)
        this.showDates.push(this.allDates[x])
      }
    }
  }

  loadDatesChart() {
    this.chart = new Chart("dates", {
      type: 'bar',
      data: {
        labels: this.showDates,
        datasets: [{
          label: 'Organizations Registration per month',
          data: this.datesValues,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  cityValues = new Array();
  countCities() {
    for (var x = 0; x < this.cities.length; x++) {
      var value = 0;
      for (var i = 0; i < this.tempCities.length; i++) {
        if (this.cities[x] == this.tempCities[i]) {
          value++;
        }
      }
      this.cityValues.push(value)
    }
    this.loadCitiesChart();
  }
  loadCitiesChart() {
    this.chart = new Chart("ourRatings", {
      type: 'line',
      data: {
        labels: this.cities,
        datasets: [{
          label: 'Total Organizations Per City',
          data: this.cityValues,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 40, 1)',
            'rgba(20, 162, 70, 1)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  profiles = 0;
  assignProilesNumber(x) {
    this.profiles = x;
  }

  getProfiles() {
    firebase
      .database()
      .ref("profiles/")
      .on("value", (data: any) => {
        if (data.val() != null || data.val() != undefined) {
          var x = Object.keys(data.val())
          this.assignProilesNumber(x.length)
        }
      })
  }

  show1(event) {
    // console.log("clicked");
    var labeler = document.getElementsByClassName("labler") as HTMLCollectionOf <HTMLElement>;
    labeler[0].style.display = "none";
    document.getElementById("one").style.display = "block"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "none"
    document.getElementById("four").style.display = "none"
  }
  show2(event) {
    var labeler = document.getElementsByClassName("labler") as HTMLCollectionOf <HTMLElement>;
    labeler[0].style.display = "none";
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "block"
    document.getElementById("three").style.display = "none"
    document.getElementById("four").style.display = "none"
  }
  show3(event) {
    var labeler = document.getElementsByClassName("labler") as HTMLCollectionOf <HTMLElement>;
    labeler[0].style.display = "none";
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "block"
    document.getElementById("four").style.display = "none"
  }
  show4(event) {

    var labeler = document.getElementsByClassName("labler") as HTMLCollectionOf <HTMLElement>;
    labeler[0].style.display = "block";
    document.getElementById("one").style.display = "none"
    document.getElementById("two").style.display = "none"
    document.getElementById("three").style.display = "none";
    
    document.getElementById("four").style.display = "block"
  }


}
