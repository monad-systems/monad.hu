const fs = require('node:fs');

const data = {
  name: 'Sticza Ferenc',
  title: 'CEO',
  phone: '+36 30 636 0775',
  email: 'ferenc.sticza@monad.hu',
  website: 'https://monad.hu',
};
const fontFamily = "'Open Sans', sans-serif";
const fontSize = '14px';
const lineHeidht = '1.25';
const colorBody = '#1D1D1D';
const colorPrimary = '#30D5C8';
const textStyle = `font-family: ${fontFamily}; line-height: ${lineHeidht}; color: ${colorBody};`;
const headingStyle = `font-size: 16px; ${textStyle} padding-top: 0.25em; padding-bottom: 0.125em; margin-top: 0; margin-bottom: 0; font-weight: bold;`;
const paragraphStyle = `font-size: ${fontSize}; ${textStyle} padding-top: 0; padding-bottom: 0; margin-top: 0; margin-bottom: 0.125em;`;
const linkStyle = `font-size: ${fontSize}; ${textStyle} color: ${colorBody};`;
const imgWidth = '100';

const signature = {
  template: `
  <!DOCTYPE html>
  <html lang="hu">
  <body>
        <table style="border:0; padding:0;" cellspacing="0" width="100%">
            <tr>
                <td width="${imgWidth}" style="background-color:${colorBody};text-align:center; vertical-align: middle; padding: 0;"><img width="${imgWidth}" style="display: block; font-size:0; padding: 0; border: 0;" src="https://monad.hu/icon.png" /></td>
                <td style="padding-left:10px; padding-bottom: 0.125em">
                    <h1 style="${headingStyle}">${data.name}</h1>
                    <p style="${paragraphStyle}">${data.title}</p>
                    <p style="${paragraphStyle}"><a style="${linkStyle}" href="tel:${data.phone.trim()}">${
    data.phone
  }</a></p>
                    <p style="${paragraphStyle}"><a style="${linkStyle}" href="mailto:${
    data.email
  }">${data.email}</a></p>
                    <p style="${paragraphStyle}"><a style="${linkStyle}" target="_blank" href="${
    data.website
  }">${data.website}</a></p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
};
fs.writeFile('./signature.html', signature.template, (err) => {
  if (err) {
    console.error(err);
  }
});
