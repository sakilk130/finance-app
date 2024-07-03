import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/shared/entity/base.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({
    length: 50,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    type: 'varchar',
    nullable: true,
  })
  plaid_id: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  user_id: number;

  @OneToMany(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
