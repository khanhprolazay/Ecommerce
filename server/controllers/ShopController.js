const ShopModel = require('../models/ShopModel');

class ShopController {
    // [GET] /shop/location
    getLocation(req, res, next) {
        ShopModel.getLocation()
            .then(response => res.send(response))
            .catch(err => res.send(err));
    }
}

module.exports = new ShopController();