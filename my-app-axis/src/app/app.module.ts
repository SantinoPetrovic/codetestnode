import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SitesComponent } from './components/sites/sites.component';
import { LoginComponent } from './components/login/login.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { DeviceComponent } from './components/device/device.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';

const appRoutes: Routes = [
 {path:'', component: HomeComponent},
 {path:'users', component: UsersComponent},
 {path:'sites', component: SitesComponent},
 {path:'sites/:siteid/alarmZones', component: AlarmComponent},
 {path:'sites/:siteid/devices', component: DeviceComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    LoginComponent,
    AlarmComponent,
    DeviceComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
