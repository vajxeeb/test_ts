import {
    Table,
    Model,
    Column,
    DataType,
    AutoIncrement,
    PrimaryKey,
    UpdatedAt,
    Sequelize,
} from "sequelize-typescript";
import CustomDate from "../services/date";
import sequelize from "sequelize/types/lib/sequelize";
@Table({
    timestamps: false,
    tableName: "tbl_table",
})

export default class _Table extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    t_id?: number
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    t_number!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
    })
    t_status!: number;
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    t_type!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    t_people!: number;
    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: CustomDate.getDate()
    })
    createAt!: Date;
    @Column({
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          )
       // defaultValue: CustomDate.getDate()
    })
    updateAt!: Date;
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}