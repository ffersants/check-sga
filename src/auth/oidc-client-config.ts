import { UserManagerSettings } from 'oidc-client'

export const oidcClientConfig: UserManagerSettings = {
  client_id: 'app_procedimento',
  authority: 'https://accountshomol.pcdf.gov.br',
  redirect_uri: 'https://procedimentohomol.pcdf.gov.br/authentication/callback',
  silent_redirect_uri: 'https://procedimentohomol.pcdf.gov.br/authentication/silent_callback',
  response_type: 'code',
  post_logout_redirect_uri: '/',
  scope: 'openid profile offline_access procedimento_api corporativo_api protocolo_api servicoproced_api',
  automaticSilentRenew: true,
  loadUserInfo: true
}
