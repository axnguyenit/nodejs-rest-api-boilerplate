// import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

// import { Tokens } from '~/modules/social/tokens';

// import { AuthProviders } from '../auth-providers.enum';

export class AuthSocialLoginDto {
  @Allow()
  // @ApiProperty({ type: () => Tokens })
  // tokens: Tokens;

  // @ApiProperty({ enum: AuthProviders })
  // @IsNotEmpty()
  // socialType: AuthProviders;
  @Allow()
  fullName?: string;
}
