import { MailConfig } from '@config/mail';
import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailTemplateProvider } from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
    attachments,
  }: ISendMailDTO): Promise<void> {
    const { name, address } = MailConfig.defaults.from;

    const templateHTML = await this.mailTemplateProvider.parse(templateData);

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.address || address,
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: templateHTML,
      attachments,
    });
  }
}
