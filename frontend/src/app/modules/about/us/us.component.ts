import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})



export class UsComponent implements OnInit {

  services = [
    {title: 'Bitcoin', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', img: '../assets/images/bitcoin-225078.svg'},
    {title: 'Finanzgurus', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', img: '../assets/images/avatar-1299805.svg'},
    {title: 'Prognosen', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ', img: '../assets/images/chart-line-148256.svg'},
  ];

  developers = [
    {name: 'Jonas Wuttke', position: 'Business & Design', img: '../assets/images/avatar-3637425.svg'},
    {name: 'Bastian Berle', position: 'Business & Frontend', img: '../assets/images/avatar-3637425.svg'},
    {name: 'Ron Holzapfel', position: 'Backend', img: '../assets/images/avatar-3637425.svg'},
    {name: 'Ferdinand Muth', position: 'Backend', img: '../assets/images/avatar-3637425.svg'},
    {name: 'Tomke Blach', position: 'Frontend', img: '../assets/images/avatar-3637425.svg'},
    {name: 'Fabian Heidger', position: 'Frontend', img: '../assets/images/avatar-3637425.svg'},
 ];

  constructor() { }

  ngOnInit(): void {
  }

}
