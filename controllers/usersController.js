const usersService = require('../services/usersService');

class usersController {
    async getAll (req, res) {
        try {
            const usersList = await usersService.getAll();
            res.status(200).json(usersList);
        } catch (e) {
            res.status(500).json({ message: `Server error: ${e}` });
        }
    }

    async updateUser (req, res) {
        try {
            const data = req.body;
            data.image = req.file.buffer.toString('base64');
            await usersService.updateUser(data);
            res.status(200).json({ message: "Updated successfully" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: `Delete ${e}` });
        }
    }

    async deleteUser (req, res) {
        try {
            const { id } = req.params;
            await usersService.deleteUser(id);
            res.status(200).json({ message: "Deleted successfully" });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: `Delete ${e}` });
        }
    }

    async createPDF (req, res) {
        try {
            const { email } = req.body;
            await usersService.createPDF(email);
            res.status(200).json( {created: true} );
        } catch (e) {
            res.status(400).json({ message: `Create PDF ${e}` });
        }
    }
}

module.exports = new usersController();