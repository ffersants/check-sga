import { UserManagerSettings } from 'oidc-client'

export const oidcClientConfig: UserManagerSettings = {
  client_id: 'app_blocoassinaturas',
  redirect_uri: 'http://localhost:3000/authentication/callback',
  response_type: 'code',
  response_mode: 'query',
  post_logout_redirect_uri: '/',
  authority: 'https://accountshomol.pcdf.gov.br',
  scope: 'email offline_access corporativo_api blocoassinaturas_api profile openid',
  silent_redirect_uri: 'https://blocoassinaturashomol.pcdf.gov.br/authentication/callback',
  automaticSilentRenew: true,
  loadUserInfo: true
}
