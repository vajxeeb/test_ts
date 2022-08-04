import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import CustomDate from "../services/date";

@Table(
    {
        tableName: "tbl_role",
        timestamps: false
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
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

    //custom createdAt and updatedAt field
    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    createdAt!: Date
    @AllowNull(false)
    @NotEmpty
    @Column({ type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    updatedAt!: Date
    //Before create and update set datetime equal to my custom date
    @BeforeCreate
    static createdAt = (role: Role) => {
        role.createdAt = CustomDate.getDateTime();
        role.updatedAt = CustomDate.getDateTime();
    }
    @BeforeUpdate
    static updatedAt = (role: Role) => {
        role.updatedAt = CustomDate.getDateTime();
    }
}






// record.dataValues.createdAt = CustomDate.getDate().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
// record.dataValues.updatedAt = CustomDate.getDate().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
// record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
// record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');