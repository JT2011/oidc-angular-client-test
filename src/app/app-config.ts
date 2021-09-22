import { Injectable } from '@angular/core';
export class ApplicationInsights {
  instrumentationKey: string;
  isEnabled: boolean;
}

export class UrlSetting {
  apiBaseUrl: string;
  serverBaseUrl: string;
  webClientBaseUrl: string;
}

export class Navigation {
  postAuthCallbackRoute: string;
}

export class OidcClient {
  authority: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  responseType: string;
  scope: string;
  filterProtocolClaims: boolean;
  loadUserInfo: boolean;
  automaticSilentRenew: boolean;
  includeIdTokenInSilentRenew: boolean;
  silentRedirectUri: string;
}
@Injectable()
export class AppConfig {
  urlSetting: UrlSetting;
  applicationInsights: ApplicationInsights;
  navigation: Navigation;
  oidcClient: OidcClient;
  apiUrl: string;
  logToConsole: boolean;
}
