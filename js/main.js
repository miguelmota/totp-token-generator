const speakeasy = require('./lib/speakeasy-2.0.0')
const base32 = require('./lib/base32')
const QRCode = require('./lib/qrcode')

const form = document.getElementById('form')
const issuer = document.getElementById('issuer')
const label = document.getElementById('label')
const qrcode = document.getElementById('qrcode')

var qr

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

  const url = `otpauth://totp/${encodeURIComponent(label.value || '').trim()}?secret=${secret}&issuer=${encodeURIComponent(issuer.value || '').trim()}`

  if (!qr) {
    qr = new QRCode(qrcode, url)
  } else {
    qr.clear()
    qr.makeCode(url)
  }

  console.log('token:', token)
  console.log('url:', url)
})
