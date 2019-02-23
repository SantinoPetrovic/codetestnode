import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Object;

    constructor(
      private loginService: LoginService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loginService.getUsers().subscribe(data => {
          if(data.success) {
            this.users = data.users;
          }
        });
    }

    login(user) {
      this.loginService.tokenizeUser(user).subscribe(data => {
        if(data.success) {
          this.loginService.storeUserData(data.token, data.user);
        }
      });      
    }

}