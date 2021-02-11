import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})



export class UsComponent implements OnInit {

  services = [
    {title: 'Bitcoin', text: 'Cryptocurrencies are independent from central banks and states and therefore the future for all who want to invest free from the influences of monetary policy. Coin2gether is the new platform around the topic of cryptocurrency and exchange of investment strategies. Whether you are an inexperienced beginner or a crypto expert, there is something for everyone here.', img: 'assets/images/bitcoin-225078.svg'},
    {title: 'Finanzgurus', text: 'Through the follow function, you have the opportunity to follow crypto influencers for free, so you can view their published trades and not miss any of their posts. So you can decide individually according to your interests, which content you want to see. Become a crypto guru yourself and share your own experiences and strategies with your followers.', img: 'assets/images/avatar-1299805.svg'},
    {title: 'Prognosen', text: '', img: 'assets/images/chart-line-148256.svg'},
  ];

  developers = [
    {name: 'Jonas Wuttke', position: 'Business & Design', img: 'assets/images/avatar-3637425.svg'},
    {name: 'Bastian Berle', position: 'Business & Frontend', img: 'assets/images/avatar-3637425.svg'},
    {name: 'Ron Holzapfel', position: 'Backend & Frontend', img: 'assets/images/avatar-3637425.svg'},
    {name: 'Ferdinand Muth', position: 'Backend', img: 'assets/images/avatar-3637425.svg'},
    {name: 'Tomke Blach', position: 'Frontend', img: 'assets/images/avatar-3637425.svg'},
    {name: 'Fabian Heidger', position: 'Frontend', img: 'assets/images/avatar-3637425.svg'},
 ];

  constructor() { }

  ngOnInit(): void {
  }

}
