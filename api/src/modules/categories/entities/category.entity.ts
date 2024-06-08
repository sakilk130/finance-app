import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
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

  @OneToMany(() => User, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
