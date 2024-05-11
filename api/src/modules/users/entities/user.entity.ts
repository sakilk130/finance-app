import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/shared/entity/base.entity';
import { ROLE } from 'src/shared/enums/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    select: false,
    length: 100,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({
    enum: ROLE,
    default: ROLE.USER,
    type: 'enum',
  })
  role: ROLE;
}
