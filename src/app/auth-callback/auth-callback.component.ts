import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) { }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
      const userDataJson = JSON.stringify(userData);
      console.log('app authenticated', isAuthenticated);
      console.log(`Current userData is '${userDataJson}'`);
      console.log(`Current access token is '${accessToken}'`);
      console.log(`Current id token is '${idToken}'`);
      console.log(`Current config id is '${configId}'`);

      sessionStorage.setItem('userData', userDataJson);

      this.router.navigate(['/']);
    });
  }

}
