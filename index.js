require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a MySQL exitosa');
  }
});

app.get('/datos', (req, res) => {
  db.query('SELECT ID, FECHA_HORA, MEDICION, UNIDAD, LOCALIZACION, DISPOSITIVO FROM DB_MacProp', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta MySQL' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
