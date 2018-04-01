const mysql = require('mysql')


class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });

        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
const base = new Database({
    host: 'fon-hackaton-18.cnaum2guqcap.eu-central-1.rds.amazonaws.com',
    user: 'root',
    password: 'rootroot',
    database: 'fonhackaton'
})
module.exports = base;