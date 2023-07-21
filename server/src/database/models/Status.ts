import {Column, Entity, PrimaryColumn, OneToMany} from 'typeorm';
import {Card} from './Card';

@Entity('status')
export class Status{
  @PrimaryColumn('varchar', {length: 100})
  idStatus: string

  @Column('varchar', {length: 100, nullable: false})
  status: string

  @OneToMany(() => Card, (card) => card.idStatus)
  cards: Card[]
}