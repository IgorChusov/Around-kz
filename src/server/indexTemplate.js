export const indexTemplate = (content) => `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#ffffff">
    <title>Around</title>
    <script src="/static/client.js" type="application/javascript"></script>
  </head>
  <body>
    <div id="react-root">${content}</div>
  </body>
  </html>
  `
