# Game notes 

### Чтобы запустить проект необходимо: 

Cоздать базу данных в PostgreSQL

```sql
  CREATE USER testUser PASSWORD 'qwerty'
  CREATE DATABASE yourNameDB OWNER testUser
  GRANT ALL PRIVILEGES ON DATABASE yourNameDB TO testUser
```

Создать файл `.sequelizerc`

```javascript
  const path = require('path');
  module.exports = {
  'config': path.resolve('db', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};
```

Создать файл `.env` и прописать свои данные БД (env-example)

Пример: 
```npm
  PORT=yourPort
  DB_STRING=postgresql://testUser:qwerty@localhost:5432/yourNameDB
```

Далее сделать команду: 

```npm 
  export DB_STRING=postgresql://testUser:qwerty@localhost:5432/yourNameDB
```

И запустить проект: 

```npm 
  npm i 
  npx sequelize-cli db:migrate
  npm start
```
