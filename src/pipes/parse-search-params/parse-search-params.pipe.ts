import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseSearchParamsPipe implements PipeTransform {
  transform(value: any) {
    const result = { ...value };

    // Verifica se `page` e `limit` existem e os converte para número
    if (value.page) {
      const page = parseInt(value.page, 10);
      if (isNaN(page)) {
        throw new BadRequestException(
          `Invalid number for "page": ${value.page}`,
        );
      }
      result.page = page;
    }

    if (value.limit) {
      const limit = parseInt(value.limit, 10);
      if (isNaN(limit)) {
        throw new BadRequestException(
          `Invalid number for "limit": ${value.limit}`,
        );
      }
      result.limit = limit;
    }

    return result;
  }
}
