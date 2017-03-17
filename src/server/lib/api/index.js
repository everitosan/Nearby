import express from "express";
import Users from "./users";
import Request from "./request";

const router = express.Router();

router
  .get("/user", Users.allUsers)
  .get("/user/:id", Users.getUser)
  .post("/user", Users.postUser)
  .put("/user/:id", Users.putUser)
  .delete("/user/:id", Users.disableUser)
  .delete("/user/remove/:id", Users.deleteUser);

router
  .get("/request", Request.allRequests)
  .get("/request/:id", Request.getRequest)
  .post("/request/", Request.postRequest)
  .put("/request/:id", Request.putRequest)
  .delete("/request/:id", Request.disableRequest)
  .delete("/request/remove/:id", Request.deleteRequest);

export default router;