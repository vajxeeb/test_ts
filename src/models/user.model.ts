import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, ForeignKey, DataType, BelongsTo }
    from "sequelize-typescript";
import Role from "./role.model";

@Table(
    {
        tableName: "tbl_user",
        timestamps: true
    }
)
export default class User extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.STRING(20), unique: true })
    username!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.STRING})
    password!: string;

    //<===========Create Association========>
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    role_id!: number;
    @BelongsTo(() => Role)
    role!: Role;

    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean


}