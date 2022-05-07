const Router = require("express");
const router = new Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware.validateToken, usersController.getAll);
router.put('/', authMiddleware.validateToken, upload.single('image'), usersController.updateUser);
router.delete('/:id', authMiddleware.validateToken, usersController.deleteUser);
router.post("/create-pdf", authMiddleware.validateToken, usersController.createPDF);

module.exports = router;