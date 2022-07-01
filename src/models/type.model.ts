import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "tbl_type",
})
export default class Type extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    type_id?: number
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    type_name!: string;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean


}