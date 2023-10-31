const {database} = require("../database/database");
const {passwordConfig, jwtConfig} = require("../config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class UserService {

    async createUser(newUser) {
        try {
            const { email, password, firstname, lastname, birthdate } = newUser;

            const result = await database().run(
                `
    INSERT INTO users (email, password, first_name, last_name, date_of_birth)
    VALUES (?, ?, ?, ?, ?)
`,
                [email, password, firstname, lastname, birthdate.toISOString()]
            );

            const userId = result.lastID;

            return userId;
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }



    async updateRole(userId, role) {
        try {
            await database().run(`
      UPDATE users SET role_id = ? WHERE id = ?
    `, [role, userId]);

            return true;
        } catch (error) {
            throw new Error(`Error updating user role: ${error}`);
        }
    }

    async getRoleById(roleId) {
        return await database().get(
            "SELECT title FROM roles WHERE id = ?",
            roleId
        );
    }

    async getRoles() {
        return await database().all(
            "SELECT * FROM roles"
        );
    }

    async getByEmail(email) {
        return await database().get(
            "SELECT * FROM users WHERE email = ?",
            email
        );
    }


    async getById(userId) {
        return await database().get(
            "SELECT * FROM users WHERE id = ?",
            userId
        );
    }

    async getAllUsers() {
        try {
            return await database().all("SELECT * FROM users");
        } catch (error) {
            throw new Error(`Error retrieving users: ${error}`);
        }
    }

    generateToken(user) {
        const tokenPayload = {
            id: user.id,
            email: user.email,
            role_id: user.role_id,
            first_name: user.first_name,
            last_name: user.last_name,
            is_child: user.is_child,
            is_pensioner: user.is_pensioner,
            date_of_birth: user.date_of_birth
        };

        return jwt.sign(
            tokenPayload,
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithms[0]
            }
        );
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(
            password,
            passwordConfig.salt,
            passwordConfig.iterations,
            passwordConfig.keylen,
            passwordConfig.digest
        ).toString(`hex`);
    }

    async changePassword(userId, newPassword) {
        try {
            const hashedPassword = this.hashPassword(newPassword);

            await database().run(`
      UPDATE users
      SET password = ?
      WHERE id = ?
    `, [hashedPassword, userId]);

            return true;
        } catch (error) {
            console.error('Error changing password:', error);
            throw new Error('Error changing password');
        }
    }
}

module.exports = new UserService();