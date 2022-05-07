const { Users } = require("../models");
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require("fs");

class usersService {
    async getAll() {
        const usersList = await Users.findAll();
        return usersList;
    }

    async updateUser(userData) {
        const user = await Users.findOne({where: { id: userData.id }});
        if (!user) {
            throw new Error(`User with id ${userData.id} doesn't exist`);
        }
        await Users.update(userData, {where: {id: userData.id}});
    }

    async deleteUser(id) {
        const user = await Users.findOne({where: { id: id }});
        if (!user) {
            throw new Error(`User with id ${id} doesn't exist`);
        }
        await Users.destroy({where: { id: id} });
    }

    async createPDF(email) {
        const user = await Users.findOne({where: { email: email }});
        if (!user) {
            throw new Error(`User with email ${email} doesn't exist`);
        }
        if (user.pdf) {
            throw new Error(`PDF has been already created`);
        }
        const imageBuffer = new Buffer(user.image, 'base64');
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize()
        const fontSize = 30;
        page.drawText(user.firstName + '\n' + user.lastName, {
            x: width/2 - 40,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        if (user.image_ext === "jpg") {
            const jpgImage = await pdfDoc.embedJpg(imageBuffer);
            const jpgDims = jpgImage.scale(0.5);
            page.drawImage(jpgImage, {
                x: page.getWidth() / 2 - jpgDims.width / 2,
                y: (height - 8 * fontSize),
                width: jpgDims.width,
                height: jpgDims.height,
            })
        } else if (user.image_ext === "png") {
            const pngImage = await pdfDoc.embedPng(imageBuffer);
            const pngDims = pngImage.scale(0.5);
            page.drawImage(pngImage, {
                x: page.getWidth() / 2 - pngDims.width / 2 + 75,
                y: (height - 8 * fontSize),
                width: pngDims.width,
                height: pngDims.height,
            })
        }
        const pdfBytes = await pdfDoc.save();
        await Users.update({
            pdf: pdfBytes
        }, { where: { email: email } });
    }
}

module.exports = new usersService();