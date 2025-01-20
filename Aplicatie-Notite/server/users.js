const express = require('express');
const multer = require('multer');
const { updateUser } = require('./models/usermodel');  // Adjust path if necessary

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // Configure proper storage for production

router.put('/update', upload.single('photo'), async (req, res) => {
  try {
    const { username, password } = req.body;
    const photo = req.file;
    const userId = req.user.id;  // Assuming authentication middleware sets req.user

    const result = await updateUser(userId, { username, password, photo });
    if (result.success) {
      res.json({ success: true, user: result.user });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Error updating user profile' });
  }
});

module.exports = router;
