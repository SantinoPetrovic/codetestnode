import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../services/sites.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  alarmZones: Object;
  devices: Object;
  services: Object;

  constructor(
    private sitesservice: SitesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() { 

    /* Get devices and alarm zones depending on which site id is set on route */
    const siteid = this.activatedRoute.snapshot.paramMap.get('siteid');
    this.sitesservice.getAlarmZoneForSite(siteid).subscribe(data => {
      if(data.success) {
        for(let alarm in data.alarms)
        if(data.alarms[alarm].armed == "1") {
          data.alarms[alarm].armed = "armed";
        } else {
          data.alarms[alarm].armed = "disarmed";
        }       
        this.alarmZones = data.alarms;       
      }
    });  

    /* Get storages and bind it with alarm zones into their device */
    this.sitesservice.getDeviceForSite(siteid).subscribe(data => {
      if(data.success) {
        for(let device in data.devices) {
          this.sitesservice.getStorages(data.devices[device].id).subscribe(storageData => {
            if(storageData.success) {
              if(data.devices[device].connected == "1") {
                data.devices[device].connected = "Yes";
              } else {
                data.devices[device].connected = "No";
              }
              data.devices[device].storages = storageData.storages;
            }
          });
          for(let alarm in this.alarmZones) {
            if(this.alarmZones[alarm].id == data.devices[device].alarm_zone_id) {
              data.devices[device].alarm = this.alarmZones[alarm];
            }
          }
        }
        this.devices = data.devices;
        console.log(this.devices);
      }
    });      

  }  

}
