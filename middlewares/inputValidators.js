const Validator = require('validator-json');
const usersModel = require('../models/usersModel');

const schema = {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    location: { type: 'string', required: true },
    images: [{ required: true }],
    price: { type: 'string', required: true },
    deliveryType: { type: 'string', required: true },
    sellerId: { type: 'string', required: true },
    sellerName: { type: 'string', required: true },
    sellerTelephoneNumber: { type: 'string', required: true }
}


module.exports = {
    validatePosting: (req, res, next) => {
        // console.log("req.body: ",  req.body);
        let passValidator = new Validator({ ...req.body, images: req.files }, schema, 'object4npass');
        let passErrors = passValidator.validate();
        console.log('passErrors: ', passErrors);
        if(passErrors.length) {
            res.send(passErrors);
        } else {
            next();
        }
    }
}
