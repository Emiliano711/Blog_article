const mysql = require("mysql2/promise")


module.exports = async function (consulta) {
    const connection = await mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "root",
       database: "article_db",
    })  

    const resultado = await connection.execute(consulta)
    return resultado;
};