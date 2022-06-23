import {
    Table,
    Model,
    Column,
    DataType,
} from "sequelize-typescript";


@Table({
    timestamps: false,
    tableName: "tbl_menu",
})
export default class Menu extends Model {

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
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}