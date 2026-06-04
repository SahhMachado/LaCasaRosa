import { Pool } from "pg";

export const db = new Pool (
    {
        connectionString: "postgresql://postgres.fjfjigkelcyrsqusqblg:N699aSFtOH4FbPrx@aws-1-us-west-2.pooler.supabase.com:5432/postgres?pgbouncer=true"
    }
)