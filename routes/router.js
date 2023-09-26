const auth = require("../middleware/auth");

module.exports = (app) => {
  const user = require("../controllers/userController");
  const agent = require("../controllers/agentController");
  const master = require("../controllers/masterController");
  let router = require("express").Router();
  // User Router
  // router.post("/register-user", user.register);
  router.post("/login", user.login);
  router.get("/get-user-role",user.getUserRole);
  router.post("/agent/create-new-transaction", agent.createTransaction);
  router.get("/agent/get-agent-all-data",agent.getAllData);

  router.post("/master-agent/create-new-transaction", master.createTransaction);
  router.get("/master-agent/get-master-all-data",master.getAllData);

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
