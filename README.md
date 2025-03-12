# sql-manager

removes mysql boilerplate & makes queries easier!

## usage

```js
const Database = require('./database');

const db = new Database({
    type: 'mysql', // OR 'sqlite'
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test' // IN CASE OF SQLite, THE NAME OF THE DATABASE
});

async function main() {
    await db.connect();
    
    const users = await db.query('SELECT * FROM users'); // OR const users = await db.query('SELECT * FROM users WHERE role = ?', ['admin']);
    console.log(users);
    
    await db.close();
}

main().catch(console.error);

```
