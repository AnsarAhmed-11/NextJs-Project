import db from "../config/db";

const findByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE user_email = ?";

  const [result] = await db.execute(query, [email]);

  return result;
};

const getUser = async () => {
  const sql = "SELECT * FROM users";
  const [result] = await db.execute(sql);
  return result;
};

const createUser = async (name, email, password) => {
  const sql = "insert into users (user_name,user_email,user_password) values(?,?,?)";
  const [result] = await db.execute(sql, [name, email, password]);
  return result;
};

export async function findGoogleAccount(provider, providerAccountId) {
  // Google accounts are stored on the users table. The old implementation
  // queried a user_accounts table that is not part of this project's schema.
  if (provider !== "GOOGLE" || !providerAccountId) return null;

  const [rows] = await db.execute(
    `SELECT
       u.id,
       u.user_name,
       u.user_email,
       u.role,
       u.is_active,
       u.google_id
     FROM users u
     WHERE u.google_id = ?
     LIMIT 1`,
    [providerAccountId],
  );

  return rows[0] || null;
}
export async function findUserById(id) {
  const [rows] = await db.execute(
    `SELECT
       id,
       user_name,
       user_email,
       user_password,
       role,
       is_active
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id],
  );

  return rows[0] || null;
}
export async function createUserAccount({userId, provider, providerAccountId,access_token}) {
  if (provider !== "GOOGLE") {
    throw new Error(`Unsupported authentication provider: ${provider}`);
  }

  const [result] = await db.execute(
    `insert into user_accounts (user_id,provider,provider_account_id,access_token) values(?,?,?,?)`,
    [userId,provider,providerAccountId,access_token],
  );

  return result;
}

export { findByEmail, getUser, createUser, findGoogleAccount,findUserById ,createUserAccount};
