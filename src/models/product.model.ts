import {
    Table,
    Model,
    Column,
    DataType,
    AutoIncrement,
} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "tbl_product",
})
export default class Product extends Model {
   
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    product_name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    price!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    quantity!: number;
    ///delete user status true mean deleted false mean not delete yet.
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean
   
}