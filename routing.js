const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("./middlewares/auth");

const {
  userRegister,
  userLogin,
  saveUserAddress,
  getPageData,
  getAllData,
  deleteUser,
} = require("./controllers/index");

router.post("/register", userRegister);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/get/:id",
    failureRedirect: "/login",
  })(req, res, next);
});
router.post("/address", ensureAuthenticated, saveUserAddress);
router.get("/page/:page", ensureAuthenticated, getPageData);
router.get("/get/:id", ensureAuthenticated, getAllData);
router.put("/delete", ensureAuthenticated, deleteUser);

module.exports = router;
