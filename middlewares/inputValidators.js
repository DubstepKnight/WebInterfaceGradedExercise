const Validator = require('validator-json');
const usersModel = require('../models/usersModel');

const schema = {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    location: { type: 'string', required: true },
    images: [{ required: true }],
    price: { type: 'integer', required: true },
    dateOfPosting: { type: 'string', required: true },
    deliveryType: { type: 'string', required: true },
    sellerInfo: { 
        id: { type: 'integer', required: true },
        name: { type: 'string', required: true },
        telephoneNumber: { type: 'string', required: true }
    }
}


module.exports = {
    validateNewPosting: (req, res) => {
        let passValidator = new Validator({ ...req.body, images: req.files }, schema, 'object4npass');
        let passErrors = passValidator.validate();
        console.log('passErrors: ', passErrors);
    }
}
