import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "tbl_menu_type",
})
export default class MenuType extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    mnt_id?: number
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    mnt_name!: string;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean


}