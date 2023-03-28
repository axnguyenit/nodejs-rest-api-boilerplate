import type { Transporter } from 'nodemailer';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

import type { ConfigService } from '~/core';

import type { MailData } from './mail.interface';
import { resetPasswordHtml } from './mail-templates/reset-password';

export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    this.createMailerOptions();
  }

  createMailerOptions() {
    this.transporter = createTransport({
      service: 'gmail',
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      ignoreTLS: this.configService.get<boolean>('mail.ignoreTLS'),
      secure: this.configService.get<boolean>('mail.secure'),
      requireTLS: this.configService.get<boolean>('mail.requireTLS'),
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.password'),
      },
      from: `${this.configService.get<string>(
        'mail.defaultName',
      )} <${this.configService.get<string>('mail.defaultEmail')}>`,
    });
  }

  async userSignUp(mailData: MailData<{ hash: string }>) {
    await this.transporter.sendMail({
      to: mailData.to,
      subject: `Confirm email`,
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
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
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.hash
      } Reset password`,
      watchHtml: 'reset-password',
      html: resetPasswordHtml({
        title: `Reset password`,
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        email: mailData.to,
        actionTitle: `Reset password`,
        appName: this.configService.get('app.name'),
      }),
    });
  }
}
