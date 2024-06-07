
const mysql = require('@mysql/xdevapi');

const connection = mysql.getSession({
    host: 'localhost',
    user: 'fiap_blog',
    password: 'root',
    database: 'fiap_blog'
});


async function conexao(){
    await connection;
}



/*
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});
*/
module.exports = connection;
