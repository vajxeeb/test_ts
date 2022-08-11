import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType, BeforeCreate, BeforeUpdate, HasMany, IsBefore } from 'sequelize-typescript';
import CustomDate from "../services/customdate";

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
    
    // @Column({field: "test_name"})
    // testName!: string

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

    @Column({ type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    createdAt!: Date

    @Column({type: DataType.DATE, defaultValue: CustomDate.getDateTime() })
    updatedAt!: Date

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
