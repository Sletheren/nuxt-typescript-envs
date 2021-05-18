'use strict';

exports.config = {
  app_name: [process.env.NR_APP_NAME],
  license_key: process.env.NR_LICENCE_KEY,
  distributed_tracing: {
    enabled: true
  },
  logging: {
    level: 'error'
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
