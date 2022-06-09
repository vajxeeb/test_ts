import {
    Table,
    Model,
    Column,
    DataType,
} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "dogs",
})
export default class Dog extends Model {
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    breed!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    })
    isGoodBoy!: boolean;
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: true,
    })
    color!: string;
}