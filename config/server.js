const config = {};

config.env         = process.env.NODE_ENV || 'development'
config.devPort     = 3000
config.appPort     = process.env.APP_PORT || 4000
config.apiName     = 'universal-react-redux-starter'
config.apiVersion  = 'v1'

export default config
