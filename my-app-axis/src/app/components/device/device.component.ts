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
        this.alarmZones = data.alarms;
      }
    });  	
    this.sitesservice.getDeviceForSite(siteid).subscribe(data => {
      if(data.success) {
        this.devices = data.devices;
      }
    });      

  }

}
