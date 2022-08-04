
export enum Query {
    getProduct = `
    SELECT      tbl_product.product_id, tbl_product.product_name, tbl_product.quantity, tbl_product.price,
                tbl_product.quantity, tbl_unit.unit_id, tbl_unit.unit_name, tbl_type.type_id, tbl_type.type_name,
                tbl_product.createdAt, tbl_product.updatedAt
        FROM    tbl_product, tbl_unit, tbl_type
                 WHERE       tbl_product.unit_id = tbl_unit.unit_id
                        AND  tbl_product.type_id = tbl_type.type_id`,
}
