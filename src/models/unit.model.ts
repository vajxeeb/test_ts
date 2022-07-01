import { Table, Model, Column, DataType, AutoIncrement, PrimaryKey } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "tbl_unit",
})
export default class Unit extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    unit_id?: number
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    unit_name!: string;

    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean
}