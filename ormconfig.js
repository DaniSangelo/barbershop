module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: false,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
};
