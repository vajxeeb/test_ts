import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, ForeignKey, DataType, BelongsTo, BeforeCreate, BeforeUpdate, AfterCreate, AfterUpdate }
    from "sequelize-typescript";
import Role from "./role.model";
import CustomDate from './../services/date';
const bcrypt = require('bcrypt')
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
    user_id?: number

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

    @BeforeCreate
    static createAt(user: User){
        user.createdAt = CustomDate.getDate();
        user.updatedAt = CustomDate.getDate();
        // console.log(user)
        // console.log("Create Sucess")
        // console.log(user.createdAt);
        // console.log(user.updatedAt)
    }
    // @BeforeUpdate
    // static async updateAt1(user: User){
    //     user.password  = await bcrypt.hash(user.password, 10);
    //     user.createdAt = await CustomDate.getDate();
    //     console.log(user)
    //     console.log("user password")
    //     console.log(user.password)
    //     console.log("updateAt")
    //     console.log(user.updatedAt)
    //     console.log(CustomDate.getDate())
    // }
}