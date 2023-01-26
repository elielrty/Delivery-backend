import multer, { Options } from 'multer';
import path from 'path';

import { AppError } from '@shared/error/AppError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  tmpFolder: string;
  uploadsFolder: string;

  multer: Options;

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket_url: string;
    };
  };
}

export const upload = {
  driver: process.env.STORAGE || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileName = `${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 50, // 50MB
    },
    fileFilter: (request, file, callback) => {
      console.log(file);
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        callback(null, true);
      } else {
        callback(null, false);
        callback(new AppError('Tipo de arquivo inválido!'));
      }
    },
  },

  config: {
    disk: {},
    aws: {
      bucket_url: process.env.AWS_BUCKET_URL,
    },
  },
} as IUploadConfig;
