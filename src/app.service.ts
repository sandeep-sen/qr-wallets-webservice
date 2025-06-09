import { Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { generateQRCode } from './qr/util.qr';
import 'dotenv/config';

@Injectable()
export class AppService {
  buildResponse(@Res() res: Response, body: object, status_code: number): Response {
    res.status(status_code);
    res.json(
      {
        body
      }
    );
    return res;
  }

  getHello(@Res() res: Response): Response {
    return this.buildResponse(res, { error: 'Page Unavailable' }, 404);
  }

  validateReq(req: Request, res: Response): Response {
    if (!req.is('application/json')) {
      return this.buildResponse(res, { error: "Content Type is not application/json" }, 415)
    }
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return this.buildResponse(res, { error: 'No Message Body' }, 400)
    }
    return null
  }

  async generateQRCode(jsonData: any): Promise<string> {
    try {
      // Validate input
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Invalid JSON data provided');
      }

      // Generate QR code SVG
      const qrCodeSVG = await generateQRCode(jsonData);
      return qrCodeSVG;
    } catch (error) {
      console.error('Error in generateQRCodeSVG service:', error);
      throw error;
    }
  }

  async generateAppleWallet(@Req() req: Request, @Res() res: Response): Promise<Response> {
    // const validReq = this.validateReq(req, res)
    // if (validReq != null) {
    //   return validReq
    // }
    // let docResp
    // try {
    //   docResp = await this.analyzeServiceCall(req.body.inputUrl, "prebuilt-receipt", null)
    // } catch (error) {
    //   return this.buildResponse(res, { errorMessage: "Error in Service", error: error.message }, 500)
    // }
    // return this.buildResponse(res, docResp.fields, 200)
    return this.buildResponse(res, { AppleWallet: 'Apple Wallet' }, 200);
  }

  async generateGoogleWallet(@Req() req: Request, @Res() res: Response): Promise<Response> {
    // const validReq = this.validateReq(req, res)
    // if (validReq != null) {
    //   return validReq
    // }
    // let docResp
    // try {
    //   docResp = await this.analyzeServiceCall(req.body.inputUrl, "prebuilt-idDocument", "en-IN")
    // } catch (error) {
    //   return this.buildResponse(res, { errorMessage: "Error in Service", error: error.message }, 500)
    // }
    // if (docResp) {
    //   if (docResp.docType === "idDocument.driverLicense") {
    //     return this.buildResponse(res, { docType: "Driver License", extractedFields: docResp.fields }, 200)
    //   } else if (docResp.docType === "idDocument.passport") {
    //     return this.buildResponse(res, { docType: "Passport", extractedFields: docResp.fields }, 200)
    //   } else {
    //     return this.buildResponse(res, { error: "Unknown document type", document: docResp }, 500)
    //   }
    // }
    return this.buildResponse(res, { GoogleWallet: 'Google Wallet' }, 200);
  }
}
