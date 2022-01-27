const fs = require('fs');
const QRCode = require('qrcode');

fs.readFile('./public/ferenc.sticza.vcf', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  QRCode.toFile('./public/ferenc.sticza.qr.svg', data, {
    type: 'svg',
    color: {
      dark: '#222525ff',
      light: '#ffffffff',
    },
    margin: 0,
    width: 600,
  });
});
