var express = require('express');
var router = express.Router();
const pcardController = require('../controllers/pcardController')

router.get('/', pcardController.viewAll)
module.exports = router;
router.get('/edit/:id', pcardController.renderEditForm);
router.post('/edit/:id', pcardController.updatePokemon);
router.get('/delete/:id', pcardController.deletePokemon);
router.get('/add', pcardController.renderAddForm);
router.post('/add', pcardController.addPokemon);
