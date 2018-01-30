
const router = require('express').Router();
const handler = (req, res, next) => res.status(200).json(require('../profiles.json'));

module.exports = router.get('/profiles', handler);
