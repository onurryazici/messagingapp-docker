const express = require("express");
const { authentication } = require("./protected/authentication");
const { getConversationList } = require("./protected/getConversationList");
const { getMessage } = require("./protected/getMessage");
const { deleteConversation } = require("./protected/deleteConversation");
const { getOnlineUsers } = require("./protected/getOnlineUsers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Hello this is the back end side :-) GET LOST!" }).status(200);
});

router.post("/protected/authentication", authentication)
router.post("/protected/getMessage", getMessage)
router.post("/protected/getConversationList", getConversationList)
router.post("/protected/deleteConversation", deleteConversation)
router.post("/protected/getAllUsers",getOnlineUsers)
module.exports = router;