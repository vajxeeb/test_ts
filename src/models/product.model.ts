import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";
import Type from "./type.model";
import Unit from "./unit.model";

@Table({
    timestamps: true,
    tableName: "tbl_product",
})
export default class Product extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    product_id?: number
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
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: 0
    })
    image!: string;
    //<===========Create Association========>
    @ForeignKey(() => Unit)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    unit_id!: number;
    @BelongsTo(() => Unit)
    unit!: Unit;

    @ForeignKey(() => Type)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    type_id!: number;
    @BelongsTo(() => Type)
    type!: Type;

    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}