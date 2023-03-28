import type { EmailSignInDto, SignInResponse, SignUpDto } from './dto';

export abstract class AuthService {
  abstract signIn(
    data: EmailSignInDto,
    onlyAdmin: boolean,
  ): Promise<SignInResponse>;

  abstract signUp(data: SignUpDto): Promise<void>;
}
