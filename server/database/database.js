const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
sqlite3.verbose();

let connection = null;

async function initializeDatabase() {
    try {
         connection = await open({
            filename: './database/database.sqlite',
            driver: sqlite3.Database,
        });
        await connection.exec('PRAGMA encoding = "UTF-8";');

        // Reading and executing SQL code from the 000-migrations.sql file
        const sql = fs.readFileSync('./migrations/000-migrations.sql', 'utf-8');
        await connection.exec(sql);

        // Getting a list of migration files
        const migrationFiles = fs.readdirSync('./migrations').sort();

        // Getting a list of migrations already applied
        const appliedMigrations = await connection.all(
            'SELECT name FROM migrations'
        );

        // Applying migrations that have not yet been performed
        for (const file of migrationFiles) {
            const migrationName = file.slice(0, -4); // Removing the .sql extension

            // Checking whether the migration has already been completed
            if (!appliedMigrations.some((m) => m.name === migrationName)) {
                console.log(`Applying migration: ${migrationName}`);

                // Reading the contents of the migration file
                const migrationContent = fs.readFileSync(
                    `./migrations/${file}`,
                    'utf-8'
                );

                // Executing the contents of the migration file
                await connection.exec(migrationContent);

                // Record information about the applied migration in the migrations table
                await connection.exec(
                    `INSERT INTO migrations (name) VALUES ('${migrationName}')`
                );

                console.log(`Migration applied: ${migrationName}`);
            }
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

function database() {
    if (!connection) {
        throw new Error('Database has not been initialized');
    }
    return connection;
}

module.exports = { initializeDatabase, database };