const mysql = require('mysql2/promise');

async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: 'database-1.ciaq66skd7qn.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: 'admin123', // Replace with your MySQL password
        database: 'log_database',
        port: 3306
    });
    return connection;
}

module.exports = connectToDatabase

