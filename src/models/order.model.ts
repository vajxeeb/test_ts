import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";


@Table({
    timestamps: false,
    tableName: "tbl_order",
})
export default class Order extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    amount!: number;
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    date_order!: Date;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    cancel!: boolean;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}