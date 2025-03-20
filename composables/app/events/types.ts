export enum EventName {
  // api
  Api401 = 'api:401',
  Api404 = 'api:404',
  Api500 = 'api:500',

  // user
  UserLogin = 'user:login',
  UserLogout = 'user:logout',

  // cart
  CartUpdate = 'cart:update',
  CartEmpty = 'cart:empty',
}

export type Events = {
  // api
  [EventName.Api401]: undefined
  [EventName.Api404]: undefined
  [EventName.Api500]: undefined

  // user
  [EventName.UserLogin]: { token: string }
  [EventName.UserLogout]: undefined

  // cart
  [EventName.CartUpdate]: undefined
  [EventName.CartEmpty]: undefined
}
