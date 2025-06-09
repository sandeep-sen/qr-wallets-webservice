# qr-wallets-webservice

Web Server generates the following a compliant Base64 encoded JSON is passed in the request as a query parameter `data`:

1. QR
1. Google Wallet Pass with the QR 
1. Apple Wallet Pass the QR

## Dev Setup

Requires node.js v23+, uses [NestJS](https://github.com/nestjs/nest) as the server framework.

Run these commands before running or debugging:
```bash
npm install

npm run build
```

Debug profile for is already configured in [.vscode/launch.json](.vscode/launch.json), so just hit debug on VS Code.

Other commands are also available like:

```bash
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
```

## Build to Deploy

TBD
Ideally containerize

1. Build the distribution by

    ```bash
    npm run build
    ```

1. Copy the `dist` directory into the container
1. Use the `node:lts-alpine` image
1. Run `node dist/main` as the entrypoint

## Usage 

Default port is 3000 you can change it in the [.env](.env) file

**GET**  `http://host:port/qr?data=<base64-encoded-json>` returns a QR Code

> [!IMPORTANT]
> These functionalities are coming soon
>
> **GET**  `http://host:port/applewallet?data=<base64-encoded-json>` returns a Apple Wallet pass
>
> **GET**  `http://host:port/qr?googlewallet=<base64-encoded-json>` returns a Google Wallet pass

## Credits

This library is built upon the foundation of [node-qrcode](https://github.com/soldair/node-qrcode), an open-source project generously licensed under the MIT License by [Ryan Day](https://github.com/soldair).

## License

[MIT](LICENSE)

## Legal Attributions

The word "QR Code" is registered trademark of:<br>
DENSO WAVE INCORPORATED

Apple Wallet® registered trademarks of Apple Inc.

Google Wallet™ is a trademark of Google LLC.
