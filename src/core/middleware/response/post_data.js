'use strict';

// imports

exports.validate = (req, res, next) => {
    console.log(req.path(), 'its valid! Yoo Hoo!');
    return next();
}

exports.handle = (req, res, next) => {

    res.send(200, {
        msg: 'post_data sent this',
        foo: 'come again'
    });
    return next();
}