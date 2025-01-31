import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomInternalErrorException extends HttpException {
  constructor(error: any) {
    console.log(JSON.stringify(error));
    console.error(error);
    super(
      {
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error?.response?.message || 'Não foi possível concluir a operação.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
