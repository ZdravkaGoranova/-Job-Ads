const Ad = require('../models/Ad.js');

const bookUtils = require('../utils/bookUtils.js');

exports.search = async (name, paymentMethod) => {

    let cprypto = await this.getAll();

    if (name) {
        cprypto = cprypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if (paymentMethod) {
        cprypto = cprypto.filter(x => x.paymentMethod == paymentMethod)
    }
    return cprypto;
};

exports.getAll = () => Book.find({}).lean();

exports.create = (ownerId, cryptoData) => Ad.create({ ...cryptoData, owner: ownerId });

exports.getOne = (bookId) => Ad.findById(bookId).lean();

exports.update = (bookId, data) => Ad.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Ad.findByIdAndDelete(bookId);

exports.getDetailsPop = (userId) => Ad.findById(userId).lean().populate({path:'usersApplied',select:'email description'});

exports.getMyWishBook = (userId) => Ad.find({ wishingList: userId}).lean();

exports.getAplly = (userId) => Ad.find({ usersApplied: userId}).lean();



exports.apply = async (userId, bookId, req, res) => {
    const ad = await Ad.findById(bookId);
    const isOwner = ad.owner == req.user._id;
    const isApply  = ad.usersApplied?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isApply) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    ad.usersApplied.push(userId);
    return await ad.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};



exports.wish = async (userId, bookId, req, res) => {
    const book = await Ad.findById(bookId);
    const isOwner = book.owner == req.user._id;
    const isWish  = book.wishingList?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    book.wishingList.push(userId);
    return await book.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};

   

//     const isWish  = book.wishingList?.filter(id => id == req.user?._id);