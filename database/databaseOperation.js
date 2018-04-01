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

    getClusters(table) {
        return sql.query(`SELECT count(korisnik.cluster) as cluster, korisnik.cluster as podaci, usluge.ime FROM  ${table} inner join usluge on korisnik.id_usluga=usluge.id group by korisnik.cluster`);
    }

    getDevices(table, startRange, endRange) {
        if (endRange && startRange) {
            return sql.query(`SELECT count(*) as devices from ${table} where device_cost >` + startRange + ` and device_cost <` + endRange);
        } else if (!endRange) {
            return sql.query(`SELECT count(*) as devices from ${table} where device_cost <` + startRange);
        }

    }

    getPredicted(table) {
        return sql.query(`SELECT count(all_data.broj_pozivaoca) as pozivaoc, all_data.broj_primaoca as primaoc FROM  all_data where all_data.tip_zapisa='ODLAZNI SMS'  group by broj_primaoca having count(all_data.broj_pozivaoca)>100 ORDER BY pozivaoc desc`);
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