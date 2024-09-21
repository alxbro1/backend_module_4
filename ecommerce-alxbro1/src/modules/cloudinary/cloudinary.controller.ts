import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../products/products.service';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from '../auth/guard/AuthGuard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly productService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiBearerAuth()
  @Put('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'The file must be less than 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const imgUrl = (await this.cloudinaryService.uploadFile(file)).secure_url;

    const product = await this.productService.update(id, { imgUrl: imgUrl });
    if (!product) throw new BadRequestException('Product not found');

    return product;
  }
}
