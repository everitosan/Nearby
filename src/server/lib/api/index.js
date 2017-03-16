import express from "express";
import Users from "./users";
const router = express.Router();

router
  .get("/user", Users.allUsers)
  .get("/user/:id", Users.getUser)
  .post("/user", Users.postUser)
  .put("/user/:id", Users.putUser)
  .delete("/user/:id", Users.disableUser)
  .delete("/user/remove/:id", Users.deleteUser);


router.post("/request", (req, res) => {

});

export default router;