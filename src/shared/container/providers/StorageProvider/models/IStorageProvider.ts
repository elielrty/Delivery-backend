import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

export interface IStorageProvider {
  saveFile({ id, name, file }: ISaveFileDTO): Promise<string>;
  deleteFile(file: string, folder: string): Promise<void>;
}
