import { Component, OnInit } from '@angular/core';
import { EventTypes, OidcClientNotification, OidcSecurityService, OpenIdConfiguration, PublicEventsService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  configuration!: OpenIdConfiguration;
  userDataChanged$!: Observable<OidcClientNotification<any>>;
  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;
  checkSessionChanged$!: Observable<boolean>;
  checkSessionChanged: any;

  title = 'oidc-angular-client';

  constructor(public oidcSecurityService: OidcSecurityService, private eventService: PublicEventsService) { }

  ngOnInit(): void {

    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
      console.log('app authenticated', isAuthenticated);
      console.log(`Current access token is '${accessToken}'`);
    });

    this.oidcSecurityService.userData$.subscribe(userDataResult => {
      console.log('userData$ => userDataResult', userDataResult);
      console.log('JSON.stringify(userDataResult.userData)', JSON.stringify(userDataResult.userData));

      sessionStorage.setItem('userData', JSON.stringify(userDataResult.userData));
    });
  }

  login() {
    console.log('logging in');
    this.oidcSecurityService.authorize();

  }
  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    console.log('logging out');
    this.oidcSecurityService.logoff();
  }

  logoffAndRevokeTokens() {
    console.log('logging out and revoking tokens');
    this.oidcSecurityService.logoffAndRevokeTokens()
      .subscribe((result) => {
        console.log(result);
        sessionStorage.removeItem('userData');
      });
  }

  logoffLocal() {
    console.log('logging out locally');
    sessionStorage.removeItem('userData');
    this.oidcSecurityService.logoffLocal();
  }
}
