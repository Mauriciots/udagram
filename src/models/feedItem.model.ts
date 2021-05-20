import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
class FeedItem extends Model {

  @Column({ allowNull: false })
  public caption: string;

  @Column({ allowNull: false })
  public url: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}

export default FeedItem;