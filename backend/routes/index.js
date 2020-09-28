const router = require("express").Router();

router.get("/", () => {
  console.log("user is connected");
});

module.exports = router;
