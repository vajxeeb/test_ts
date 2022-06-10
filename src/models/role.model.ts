import {
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    NotEmpty,
    DataType,
} from "sequelize-typescript";

@Table(
    {
        tableName: "tbl_role",
        timestamps: true
    }
)
export default class Role extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    role_name!: string


}