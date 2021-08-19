import { Request, Express } from 'express';
import { FileFilterCallback } from 'multer';
import { BadRequestException } from '@nestjs/common';

export function imageFileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new BadRequestException(
        `${file.fieldname} only image files are allowed!`,
      ),
    );
  }

  return callback(null, true);
}
