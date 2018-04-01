const sql = require('./databaseConnect');

class DatabaseQueries {

    getAll(table) {
        return sql.query(`SELECT * FROM ${table}`);
    }

    getById(table, id) {
        return sql.query(`SELECT * FROM ${table} WHERE id=?`, [id]);
    }
    proba(dan, table) {
        return sql.query(`SELECT COUNT(*) AS BROJ FROM ${table} WHERE dan=?`, [dan]);
    }
    getByDateAndCount(table, dan) {
        let brojProdatih = [];

        return sql.query(`SELECT COUNT(*) AS BROJ FROM ${table} WHERE dan=?`, [dan]);
        // for (let i = 0; i < 9; i++) {
        //     dan.push(i + 1);
        //     console.log()
        //     this.proba(dan[i], table).then((user) => {
        //         brojProdatih.push(user);
        //     });
        // }
        // while (brojProdatih.length < 1);
        // return {
        //     dan: dan,
        //     brojProdatih: brojProdatih
        // }
    }



    insert(table, object) {
        return sql.query(`INSERT INTO ${table} SET ?`, [object]);
    }

    delete(table, id) {
        return sql.query(`DELETE FROM ${table} WHERE id=?`, [id]);
    }

    update(table, id, object) {
        return sql.query(`UPDATE ${table} SET ? WHERE id=?`, [object, id]);
    }
}


const db = new DatabaseQueries();

module.exports = db;