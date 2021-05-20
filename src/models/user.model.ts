import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
class User extends Model {

  @Column({ allowNull: false })
  public email: string;

  @Column
  public password_hash: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}

export default User;