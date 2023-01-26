interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      address: string;
    };
  };
}

export const MailConfig = {
  driver: process.env.MAIL_PROVIDER || 'ethereal',

  defaults: {
    from: {
      name: 'Mr League',
      address: 'mrleaguedev@gmail.com',
    },
  },
} as IMailConfig;
