const router = require('express').Router();

const Ad = require('../models/Ad.js');
const bookServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('home/index')
});


router.get('/catalog', async (req, res) => {//

    let jobs = await Ad.find().lean();
    // console.log(cryptos)
    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('book/catalog', { jobs });

});
router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    const book = await bookServices.search(name, paymentMethod);
    const paymentMethods = bookUtils.generatePaymentMethod(paymentMethod);

    res.render('home/search', { book, paymentMethods, name });

});

module.exports = router;