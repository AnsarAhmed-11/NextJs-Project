
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
  const sql = `
    INSERT INTO users (user_name, user_email, user_password)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(sql, [name, email, password]);
  return result;
};

// Find Google account using user_accounts table
export async function findGoogleAccount(provider, providerAccountId) {
  if (!provider || !providerAccountId) return null;

  const query = `
    SELECT
      u.id,
      u.user_name,
      u.user_email,
      u.role,
      u.is_active,
      gu.provider,
      gu.provider_account_id
    FROM google_user gu
    INNER JOIN users u ON gu.user_id = u.id
    WHERE gu.provider = ?
      AND gu.provider_account_id = ?
    LIMIT 1
  `;

  const [rows] = await db.execute(query, [
    provider,
    providerAccountId,
  ]);

  return rows[0] || null;
}

// Find user using MySQL ID
export async function findUserById(id) {
  const query = `
    SELECT
      id,
      user_name,
      user_email,
      user_password,
      role,
      is_active
    FROM users
    WHERE id = ?
    LIMIT 1
  `;

  const [rows] = await db.execute(query, [id]);
  return rows[0] || null;
}

// Link Google account with existing MySQL user
export async function createUserAccount({
  userId,
  provider,
  providerAccountId,
  access_token,
}) {
  if (provider !== "GOOGLE") {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const query = `
    INSERT INTO google_user
    (user_id, provider, provider_account_id, access_token)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    userId,
    provider,
    providerAccountId,
    access_token || null,
  ]);

  return result;
}

export {
  findByEmail,
  getUser,
  createUser,
  findGoogleAccount,
  findUserById,
  createUserAccount,
};
