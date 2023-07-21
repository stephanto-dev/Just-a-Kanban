import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('users')
export class User{
  @PrimaryColumn('varchar', {length:100})
  idUser: string

  @Column('varchar', {length:100, nullable:false})
  username: string

  @Column('varchar', {length:100, nullable:false})
  email: string

  @Column('varchar', {length:256, nullable:false})
  password: string
}