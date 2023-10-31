const express = require("express");
const router = express.Router();
const userService = require('../service/user-service');


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getByEmail(email);


        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const hashedPassword = userService.hashPassword(password);

        if (hashedPassword !== user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = userService.generateToken(user);

        res.header('Authorization', 'Bearer ' + token).json({ token });
    } catch (error) {
        console.error('User login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, birthdate} = req.body;

        const existingUser = await userService.getByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = userService.hashPassword(password);

        const newUser = {
            email,
            password: hashedPassword,
            firstname,
            lastname,
            birthdate: new Date(birthdate)
        };

        await userService.createUser(newUser);

        res.status(201).json({ message: 'The user is successfully registered.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/change-role/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        const user = await userService.getById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userService.updateRole(userId, role);

        res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Error changing user role:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update/password', async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        await userService.changePassword(userId, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});

router.get('/roots', async (req, res) => {
    try {
        const roleId = Number(req.query.roleId);

        if (isNaN(roleId)) {
            const users = await userService.getAllUsers();
            res.json(users);
        } else if (roleId === 0) {
                const roles = await userService.getRoles();
                res.json(roles);
        } else {
            const role = await userService.getRoleById(roleId);
            res.json(role);
        }

    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

router.get('/role', async (req, res) => {
    try {
        const roleId = Number(req.query.roleId);
        const role = await userService.getRoleById(roleId);
        res.json(role);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

module.exports = router;

