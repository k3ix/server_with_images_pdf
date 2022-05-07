const { verify } = require('jsonwebtoken');
const { Users } = require('../models');

class authMiddleware {
    async validateToken (req, res, next) {
        const accessToken = req.header("accessToken");
        if (!accessToken) return res.status(400).json({error: "User not logged in"});
        try {
            const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
            const user = await Users.findOne({where: { id: validToken.id } });
            if (user) {
                return next();
            } else {
                return res.status(400).json({ error: "User is not logged in"});
            }
        } catch (err) {
            return res.json({error: err});
        }
    }
}

module.exports = new authMiddleware();