import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './dto/cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          if (result) {
            resolve(result);
          }
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
