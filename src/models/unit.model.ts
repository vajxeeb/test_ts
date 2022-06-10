import {
    Table,
    Model,
    Column,
    DataType,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "tbl_unit",
})
export default class Unit extends Model {
   
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    unit_name!: string;

    ///delete user status true mean deleted false mean not delete yet.
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean
}