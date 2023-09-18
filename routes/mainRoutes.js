
const express = require('express');
const router = express.Router();
const productRoutes = require ("../routes/products/productRoutes");
const userRoutes = require ("../routes/users/userRoutes.js")
// const adminRoutes = require ('../routes/admin/adminRoutes')
const index = require ("../routes/index")

router.use("/", index)
router.use ("/api/products/", productRoutes)
router.use ("/api/users/", userRoutes)
// router.use('/admin', adminRoutes)

module.exports = router