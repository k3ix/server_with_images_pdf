const Router = require("express");
const router = new Router();
const authController = require('../controllers/authController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/registration', upload.single('image'), authController.registration);
router.post('/login', authController.login);

module.exports = router;