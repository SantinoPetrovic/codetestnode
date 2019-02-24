import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SitesService } from '../../services/sites.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
    sites: Object;

    constructor(
	  	private loginService: LoginService,
	  	private sitesService: SitesService,
	  	private router: Router,
      private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    /* Get your token user, and pass its id to db, so we can get all sites connected to the user. */
  	this.loginService.getProfile().subscribe(user => {
	  	this.sitesService.getSitesForUser(user).subscribe(data => {	  		
	  		if(data.success) {
            this.sites = data.sites
        }
	  	});
  	});
  }

}
