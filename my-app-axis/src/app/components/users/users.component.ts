import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	users: Object;

    constructor(
	  	private loginService: LoginService,
	  	private router: Router
    ) { }

    ngOnInit() {
	    this.loginService.getUsers().subscribe(data => {	    	
	    	if(data.success) {
	    		this.users = data.users;	    		
	    	} else {
	    	}
	    });  
    }

}