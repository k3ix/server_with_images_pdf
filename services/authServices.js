const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require('jsonwebtoken');


class authServices {
    async registration(data) {
        const candidate = await Users.findOne({ where: { email: data.email } });
        if (candidate) {
            throw new Error(`User with email ${data.email} already exist`);
        } else {
            const hashedPassword = await bcrypt.hash(data.password, 7)
            await Users.create({
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
                image_ext: data.imageExt
            });
        }
    }

    async login(email, password) {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            throw new Error(`There is no users with email ${email}`);
        }
        const equal = await bcrypt.compare(password, user.password);
        if (!equal) {
            throw new Error("Wrong password");
        }
        const accessToken = sign({email: user.email, id: user.id}, process.env.ACCESS_TOKEN);
        return accessToken;
    }
}

module.exports = new authServices();