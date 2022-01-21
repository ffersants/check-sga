import React from 'react'
import { OidcSecure } from '@axa-fr/react-oidc-context'
import { Route, RouteProps } from 'react-router-dom'

type SecureRouteType = {
  component: React.FC
}

type RoutePropsWithoutComponent = Omit<RouteProps, 'component'>

export const SecureRoute: React.FC<SecureRouteType & RoutePropsWithoutComponent> = ({
  component: Component,
  ...props
}) => {
  return (
    <Route {...props}>
      <OidcSecure>
        <Component />
      </OidcSecure>
    </Route>
  )
}
