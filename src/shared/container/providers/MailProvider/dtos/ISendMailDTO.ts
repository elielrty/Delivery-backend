import { IParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  address: string;
}

export interface IMailAttachment {
  filename: string;
  content: string;
  encoding: string;
}

// interface IMailAttachment {
//   filename: string;
//   path: string;
// }

export interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
  attachments?: IMailAttachment[];
}
