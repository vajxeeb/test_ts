import {
    Table,
    Model,
    Column,
    DataType,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";
@Table({
    timestamps: true,
    tableName: "tbl_menu",
})
export default class Menu extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    menu_id?: number
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    menu_name!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    menu_price!: number;
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: 0
    })
    menu_type!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: 0
    })
    menu_image!: string;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}