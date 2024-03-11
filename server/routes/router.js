const express = require('express');
const postRouter = require('./postRouter');
const userRouter = require('./userRouter');
const router = express.Router();

router.use('/post', postRouter);
router.use('/user', userRouter);

module.exports = router;