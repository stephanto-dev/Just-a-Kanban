import {Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Status } from './Status';
import { User } from './User';


@Entity('cards')
export class Card{
  @PrimaryColumn('varchar', {length: 100})
  idCard: string

  @Column('varchar', {length: 100})
  text: string

  @ManyToOne(() => Status, (status) => status.idStatus)
  idStatus: Status

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

}