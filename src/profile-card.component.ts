import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

import { IProfileCard } from './profile';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: [ './profile-card.component.scss' ],
  encapsulation: ViewEncapsulation.Native
})
export class ProfileCardComponent implements OnInit { 

  @Input() profile: IProfileCard | any;

  constructor() { }

  ngOnInit() {
    if (this.profile !== '[Object Object]' && typeof(this.profile) === 'string') {
      this.profile = JSON.parse(this.profile);
    } 
  }

}