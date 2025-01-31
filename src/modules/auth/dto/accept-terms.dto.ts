import { IsBoolean } from 'class-validator';

export class AcceptTermsDto {
  @IsBoolean()
  termsAccepted: boolean;
}
