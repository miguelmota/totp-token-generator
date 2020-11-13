const speakeasy = require('./lib/speakeasy-2.0.0')
const base32 = require('./lib/base32')

const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const secret = event.currentTarget.secret.value.trim().replace(/\s/gi, '')

  const token = speakeasy.totp({
    secret: Buffer.from(base32.decode(secret)),
    encoding: 'base32',
    digits: 6,
    algorithm: 'sha1'
  })

  event.currentTarget.token.innerHTML = token
})
