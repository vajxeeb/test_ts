import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import CustomDate from "../services/date";

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
    //<====Delete status:true-> mean deleted, false-> mean not delete yet.]====>
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false, })
    del!: boolean

    // @AllowNull(false)
    // @NotEmpty
    // @Column({type: DataType.DATE, defaultValue: CustomDate.getDate()})
    // createAt!: Date
    // @AllowNull(false)
    // @NotEmpty
    // @Column({type: DataType.DATE, defaultValue: CustomDate.getDate()})
    // updateAt!: Date

    @BeforeCreate
    static createAt = (record: any, option: any) => {
        // role.createdAt = CustomDate.getDate();
        // role.updatedAt = CustomDate.getDate();

        record.dataValues.createdAt = CustomDate.getDate().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        record.dataValues.updatedAt = CustomDate.getDate().toISOString().replace(/T/, ' ').replace(/\..+/g, '');

        // record.dataValues.createdAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
        // record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    }
    @BeforeUpdate
    static updateAt = (record: any, option: any) => {
        //    record.dataValues.updatedAt = CustomDate.getDate();
        //    console.log(record.dataValues.updatedAt)
        // record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');

    }
}