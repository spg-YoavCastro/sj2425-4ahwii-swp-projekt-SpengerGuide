const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ente',
    database: ''
});

connection.connect((err) => {
    if (err) {
        console.error('Verbindung fehlgeschlagen: ' + err.stack);
        return;
    }
    console.log('Verbunden als ID ' + connection.threadId);
});

connection.query('SELECT * FROM deine_tabelle', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();
