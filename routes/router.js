const auth = require("../middleware/auth");

module.exports = (app) => {
  const user = require("../controllers/userController");
  const agent = require("../controllers/agentController");
  let router = require("express").Router();
  // User Router
  // router.post("/register-user", user.register);
  router.post("/login", user.login);
  router.post("/agent/create-new-transaction", agent.createTransaction);
  // router.get("/get-current-user", user.getCurrentUser);

  // router.post("/add-account-to-cart", user.addAccountToCart);
  // router.get("/get-all-cart", user.getAllCart);

  // router.post(
  //   "/register-account-type",
  //   upload.single("avatar"),
  //   accountTypeList.addType
  // );
  // router.get("/get-all-account-type/", accountTypeList.findAllorName);
  // router.post("/add-account", account.addAccount);

  // router.post('/send-account-info',user.sendAccountInfoByEmail);
  app.use("/", router);
};
