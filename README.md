# sql-manager

removes mysql boilerplate & makes queries easier!

#useage

```js
const sqlman = require('sql-manager');

let data = {
    host: '',
    user: '',
    password: '',
    database: ''
};

const db = new sqlman(data);

db.run('QUERY', function (result) {
  console.log(result)
});
```
