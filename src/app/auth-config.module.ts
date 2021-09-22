/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, OpenIdConfiguration, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';

import { map } from 'rxjs/operators';
import { AppConfig } from './app-config';

export const httpLoaderFactory = (httpClient: HttpClient) => {

  const config$ = httpClient
    .get<AppConfig>(`./assets/config.json`)
    .pipe(
      map((appConfig: AppConfig) => {
        const customConfig = appConfig.oidcClient;
        return {
          authority: customConfig.authority,
          redirectUrl: customConfig.redirectUri,
          clientId: customConfig.clientId,
          responseType: customConfig.responseType,
          scope: customConfig.scope,
          postLogoutRedirectUri: customConfig.postLogoutRedirectUri,
          //startCheckSession: customConfig.start_checksession,
          silentRenew: customConfig.automaticSilentRenew,
          silentRenewUrl: customConfig.redirectUri + '/silent-renew.html',
          // postLoginRoute: customConfig.startup_route,
          // forbiddenRoute: customConfig.forbidden_route,
          // unauthorizedRoute: customConfig.unauthorized_route,
          logLevel: LogLevel.Debug,
          // maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
          historyCleanupOff: true,
          autoUserInfo: false,
        } as OpenIdConfiguration;
      })
    )
    .toPromise();


  // const config$ = httpClient
  //   .get<OpenIdConfiguration>(`https://offeringsolutions-sts.azurewebsites.net/api/ClientAppSettings`)
  //   .pipe(
  //     map((customConfig: any) => {
  //       return {
  //         authority: customConfig.stsServer,
  //         redirectUrl: customConfig.redirect_url,
  //         clientId: customConfig.client_id,
  //         responseType: customConfig.response_type,
  //         scope: customConfig.scope,
  //         postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
  //         startCheckSession: customConfig.start_checksession,
  //         silentRenew: customConfig.silent_renew,
  //         silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
  //         postLoginRoute: customConfig.startup_route,
  //         forbiddenRoute: customConfig.forbidden_route,
  //         unauthorizedRoute: customConfig.unauthorized_route,
  //         logLevel: LogLevel.None,
  //         maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
  //         historyCleanupOff: true,
  //         // autoUserInfo: false,
  //       } as OpenIdConfiguration;
  //     })
  //   )
  //   .toPromise();

  return new StsConfigHttpLoader(config$);
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
