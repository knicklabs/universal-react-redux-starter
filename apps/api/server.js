import express from 'express'

const api = express()

api.get('/settings', (req, res) => {
  res.send({
    title: 'Universal React-Redux Starter App',
    description: 'A barebones place to start building universal apps.'
  })
})

export default api
