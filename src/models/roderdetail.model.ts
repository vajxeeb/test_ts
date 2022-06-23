import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import _Table from './table.model';
import Menu from './menu.model.';


@Table({
    timestamps: false,
    tableName: "tbl_order_detail",
})
export default class OrderDetail extends Model {

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
    date_order_detail!: Date;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: 0
    })
    cancel!: boolean;
    //<===========Create Association========>
    @ForeignKey(() => Menu)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    menu_id!: number;
    @BelongsTo(() => Menu)
    menu!: Menu;

    @ForeignKey(() => _Table)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    table_id!: number;
    @BelongsTo(() => _Table)
    _table!: _Table;

    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}