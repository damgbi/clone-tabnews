import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = parseInt(
    maxConnections.rows[0].max_connections,
    10,
  );

  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnectionsValue = openedConnections.rows[0].count;

  const vPostgres = await database.query("SHOW server_version;");
  const databaseVersionValue = vPostgres.rows[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        openedConnections: openedConnectionsValue,
      },
    },
  });
}

export default status;
