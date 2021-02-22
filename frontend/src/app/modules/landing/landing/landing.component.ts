import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  links = [
    {loc: '/feed', title: $localize`:Feed@@feedID:Feed`},
    {loc: '/about/us', title: $localize`:About Us@@aboutUsID:About Us`},
 ];

  constructor(
    public themesService: ThemeService
  ) {
  }

  ngOnInit(): void {
  }

}
