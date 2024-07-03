import { Account } from 'src/modules/accounts/entities/account.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  payee: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  notes: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  date: Date;

  @Column({
    type: 'integer',
    nullable: false,
  })
  account_id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  category_id: number;

  @ManyToOne(() => Account, (account) => account.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Category, (category) => category.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
