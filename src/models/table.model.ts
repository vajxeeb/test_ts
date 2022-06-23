import {
    Table,
    Model,
    Column,
    DataType,
} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "tbl_table",
})

export default class _Table extends Model {

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    number!: string;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        unique: true,
        defaultValue: false
    })
    open!: boolean;
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    type!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    people!: number;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    book!: boolean;

    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

}