-- mostra o banco de dados atual
SELECT current_database();

-- show tables no pqsql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
