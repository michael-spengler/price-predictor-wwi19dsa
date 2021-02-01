import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  links = [
    {loc: '/', title: 'Home'},
    {loc: '/blog/feed', title: 'Blog'},
    {loc: '/about/us', title: 'About Us'},
    {loc: '/', title: 'Wallet'},
 ];

  constructor(
    public themesService: ThemeService
  ) {
  }

  ngOnInit(): void {
  }

}
