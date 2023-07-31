import {Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Status } from './Status';
import { User } from './User';


@Entity('cards')
export class Card{
  @PrimaryColumn('varchar', {length: 100, generated:'uuid'})
  idCard: string

  @Column('varchar', {length: 100})
  text: string

  @Column('varchar', {length: 100})
  color: string

  @ManyToOne(() => Status, (status) => status.idStatus)
  status: Status

  @ManyToMany(() => User, {cascade:true})
  @JoinTable()
  users: User[]

}