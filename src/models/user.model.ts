import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, ForeignKey, DataType, BelongsTo, BeforeCreate, BeforeUpdate}
    from "sequelize-typescript";
import Role from "./role.model";
import CustomDate from '../services/customdate';
import { Constants } from "../services/constants";
const bcrypt = require('bcrypt')

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
    user_id?: number

    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.STRING(20), unique: true })
    username!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.STRING(100), allowNull: false})
    password!: string;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    role_id!: number;
    
    @BelongsTo(() => Role)
    role!: Role;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

    @Column({ type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    createdAt!: Date

    @Column({type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    updatedAt!: Date

    @BeforeCreate
    static createdAt = async (user: User) => {
        user.createdAt = await CustomDate.getDateTime();
        user.updatedAt = await CustomDate.getDateTime();
        user.password =  await bcrypt.hash(user.password, Constants.SALT)
    }
    
    @BeforeUpdate
    static updatedAt = async (user: User) => {
        user.updatedAt = await CustomDate.getDateTime();
        user.password = await bcrypt.hash(user.password,  Constants.SALT)
    }
}

