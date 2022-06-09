import {
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    NotEmpty,
    ForeignKey,
    HasMany,
    HasOne,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import Role from "./role.model";

// export interface UserI{
//     id?: number | null
//     first_name: string
//     last_name: string
//     email: string
//     password: string
// }

@Table(
    {
        tableName: "tbl_user",
        timestamps: false
    }
)
export default class User extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column({type: DataType.STRING(50)})
    first_name!: string

    @AllowNull(false)
    @NotEmpty
    @Column({type: DataType.STRING(50)})
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({type: DataType.STRING(20), unique: true})
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({type: DataType.STRING(20)})
    password!: string;
    @AllowNull(true)
    @Column({type: DataType.STRING(20)})
    confirm_password!: string;

    //////create foreignkey with role//////
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    role_id!: number;
    //////create associations////////////
    @BelongsTo(() => Role)
     role!: Role;
}