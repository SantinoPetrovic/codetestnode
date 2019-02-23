import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SitesComponent } from './components/sites/sites.component';
import { LoginComponent } from './components/login/login.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { DeviceComponent } from './components/device/device.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';


import { LoginService } from './services/login.service';
import { TokenGuard } from './guards/token.guard';

const appRoutes: Routes = [
 {path:'', component: HomeComponent},
 {path:'users', component: UsersComponent},
 {path:'sites', component: SitesComponent, canActivate:[TokenGuard]},
 {path:'sites/:siteid/alarmZones', component: AlarmComponent, canActivate:[TokenGuard]},
 {path:'sites/:siteid/devices', component: DeviceComponent, canActivate:[TokenGuard]},
 {path:'login', component: LoginComponent},
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
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService, TokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }