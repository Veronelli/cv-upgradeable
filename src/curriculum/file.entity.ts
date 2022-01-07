import { IFile } from 'src/interfaces/file.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File implements IFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path?: string;

  @Column()
  version: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @Column()
  fileName: string;
}
