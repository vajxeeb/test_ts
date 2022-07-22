import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import User from './user.model';
@Table({
    timestamps: false,
    tableName: "tbl_bill",
})
export default class Bill extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    bill_id?: number
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bill_number!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    bill_price!: number;
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    bill_date!: Date;
    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    bill_time!: string;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    cancel!: boolean;
     //<===========Create Association========>
     @ForeignKey(() => User)
     @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
     user_id!: number;
     @BelongsTo(() => User)
     user!: User;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

   
}