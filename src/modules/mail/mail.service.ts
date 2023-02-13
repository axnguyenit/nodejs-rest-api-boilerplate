import type { Transporter } from 'nodemailer';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

import type { ConfigService } from '~/providers';

import type { MailData } from './mail.interface';

export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.createMailerOptions();
  }

  createMailerOptions() {
    this.transporter = createTransport({
      service: 'gmail',
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      ignoreTLS: this.configService.get<boolean>('MAIL_IGNORE_TLS'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      requireTLS: this.configService.get<boolean>('MAIL_REQUIRE_TLS'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
      from: `${this.configService.get<string>(
        'MAIL_DEFAULT_NAME',
      )} <${this.configService.get<string>('MAIL_DEFAULT_EMAIL')}>`,
    });

    const handlebarsOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        extname: '.hbs',
        partialsDir: path.join(
          process.cwd(),
          'src',
          'modules',
          'mail',
          'mail-templates',
        ),
        defaultLayout: false,
      },
      viewPath: path.join(
        process.cwd(),
        'src',
        'modules',
        'mail',
        'mail-templates',
      ),
    };

    this.transporter.use('compile', hbs(handlebarsOptions));
  }

  async userSignUp(mailData: MailData<{ hash: string }>) {
    await this.transporter.sendMail({
      to: mailData.to,
      subject: `Confirm email`,
      text: `${this.configService.get('FRONTEND_DOMAIN')}/confirm-email/${
        mailData.data.hash
      } Confirm email`,
      html: 'activation',
      // context: {
      //   title: `Confirm email`,
      //   url: `${this.configService.get('FRONTEND_DOMAIN')}/confirm-email/${
      //     mailData.data.hash
      //   }`,
      //   actionTitle: `Confirm email`,
      //   app_name: this.configService.get('app.name'),
      //   text1: 'Hey!',
      //   text2: 'You’re almost ready to start enjoying',
      //   text3:
      //     'Simply click the big green button below to verify your email address.',
      // },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>) {
    await this.transporter.sendMail({
      to: mailData.to,
      subject: `Reset password`,
      text: `${this.configService.get('FRONTEND_DOMAIN')}/password-change/${
        mailData.data.hash
      } Reset password`,
      html: 'reset-password',

      // template: 'reset-password',
      // context: {
      //   title: `Reset password`,
      //   url: `${this.configService.get('FRONTEND_DOMAIN')}/password-change/${
      //     mailData.data.hash
      //   }`,
      //   actionTitle: `Reset password`,
      //   app_name: this.configService.get('app.name'),
      //   text1: `Trouble signing in?`,
      //   text2: `Resetting your password is easy.?`,
      //   text3: `Just press the button below and follow the instructions. We’ll have you up and running in no time.`,
      //   text4: `If you did not make this request then please ignore this email.`,
      // },
    });
  }
}
