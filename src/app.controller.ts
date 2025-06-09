import { Body, Controller, Get, Header, HttpException, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { DataValidator } from './utils/util.validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Header('content-type', 'application/json')
  getHello(@Res() res: Response): Response {
    return this.appService.getHello(res);
  }

  @Get('/qr')
  @Header('content-type', 'image/svg+xml')
  async generateQRCode(@Query('data') data: string, @Res() res: Response): Promise<Response> {
    try {
      // Validate base64 encoded JSON data
      const validationResult = DataValidator.validateBase64JsonData(data, 'data');

      if (!validationResult.isValid) {
        res.set('Content-Type', 'application/json');
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: validationResult.error
        });
      }

      // Generate SVG QR code using the validated JSON data
      const qrCodeSVG = await this.appService.generateQRCode(validationResult.data);

      // Send SVG response
      res.set('Content-Type', 'image/svg+xml');
      return res.send(qrCodeSVG);
    } catch (error) {
      res.set('Content-Type', 'application/json');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to generate QR code',
        message: error.message
      });
    }
  }

  @Get('/applewallet')
  @Header('content-type', 'application/json')
  async appleWallet(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return this.appService.generateAppleWallet(req, res)
  }

  @Get('/googlewallet')
  @Header('content-type', 'application/json')
  async googleWallet(@Req() req: Request, @Res() res: Response): Promise<Response> {
    console.log("in doc req")
    return this.appService.generateGoogleWallet(req, res)
  }
}
