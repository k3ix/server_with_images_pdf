const authServices = require('../services/authServices');

class authController {
    async registration (req, res) {
        try {
            const data = req.body;
            if (!data.email || !data.password || !data.firstName || !data.lastName || !req.file ) {
                res.status(400).json({error: "Empty field"});
            } else {
                data.imageExt = req.file.originalname.split(".")[1];
                if (data.imageExt !== "jpg" && data.imageExt !== "png") {
                    res.status(400).json({error: "Picture format should be jpg or png"});
                } else {
                    data.image = req.file.buffer.toString('base64');
                    await authServices.registration(data);
                    res.status(200).json({message: 'Registered'});
                }
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message: `Registration ${e}` });
        }
    }

    async login (req, res) {
        try {
            const { email, password } = req.body;
            const accessToken = await authServices.login(email, password);
            res.status(200).json({ accessToken });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: `Login ${e}` });
        }
    }
}

module.exports = new authController();