import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  EventsListComponent,
  EvenThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { EventListResolver } from './events/events-list-resolver.service';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EvenThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService, 
    ToastrService, 
    EventRouteActivator,
    EventListResolver,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  if(component.isDirty)
    return window.confirm
    ('You have not saved this event, do you really want to cancel?')
  return true
}
