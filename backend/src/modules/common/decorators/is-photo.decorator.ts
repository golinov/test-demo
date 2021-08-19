import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const IsPhoto = createParamDecorator(
  (fieldName: string, input: ExecutionContextHost) => {
    const file = input.getArgByIndex(0).res.req.file;
    if (file && file.fieldname === fieldName) {
      return file;
    }

    throw new BadRequestException(`${fieldName} is required!`);
  },
);
