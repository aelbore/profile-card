import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerAsCustomElements } from '@angular/elements';

import { ProfileCardComponent } from './profile-card.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ProfileCardComponent ],
  exports: [ ProfileCardComponent ],
  entryComponents: [ ProfileCardComponent ]
})
export class ProfileCardModule { 
  ngDoBootstrap() { } 
}

registerAsCustomElements([ ProfileCardComponent ], () =>
  platformBrowserDynamic().bootstrapModule(ProfileCardModule)
);