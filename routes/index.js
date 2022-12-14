const express = require('express');
const router = express.Router();
 
router.use('/productos', require('./productos'));
router.get('/', (req, res) => {
	res.send('¡Bienvenido!');
});

module.exports = router;