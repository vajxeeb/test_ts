import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    ForeignKey
} from "sequelize-typescript";
import Product from './product.model';
import User from './user.model';
import Bill from './bill.model';

@Table({
    timestamps: true,
    tableName: "tbl_bill_detail",
})
export default class BillDetail extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    bill_dt_id?: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity!: number;
    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    bill_dt_date!: Date;
    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    bill_dt_time!: string;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    cancel!: boolean;
    //<===========Create Association========>
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product_id!: number;
    @BelongsTo(() => Product)
    product!: Product;
    //<===========Create Association========>
    @ForeignKey(() => Bill)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    bill_id!: number;
    @BelongsTo(() => Bill)
    bill!: User;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean



}