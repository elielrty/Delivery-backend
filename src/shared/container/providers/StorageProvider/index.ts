import { upload } from '@config/upload';
import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './models/IStorageProvider';

const storage = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[upload.driver],
);
