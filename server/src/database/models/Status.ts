import {Column, Entity, PrimaryColumn, OneToMany} from 'typeorm';
import {Card} from './Card';

@Entity('status')
export class Status{
  @PrimaryColumn('int', {generated: 'increment'})
  idStatus: number

  @Column('varchar', {length: 100, nullable: false})
  status: string

  @OneToMany(() => Card, card => card.status)
  cards: Card[]
}