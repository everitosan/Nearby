import express from "express";
import Users from "./users";
import Request from "./request";
import Offer from "./offer";

const router = express.Router();

router
  .get("/user", Users.allUsers)
  .get("/user/:id", Users.getUser)
  .post("/authUser", Users.authUser)
  .post("/user", Users.postUser)
  .put("/user/:id", Users.putUser)
  .delete("/user/:id", Users.disableUser)
  .delete("/user/remove/:id", Users.deleteUser)
  .post("/user/:id/createRequest/", Users.createRequest)
  .delete("/user/:id/removeRequest/:id_request", Users.deleteRequest)
  .post("/user/:id/createOfferForRequest/:id_request", Users.createOffer)
  .delete("/user/:id/deleteForRequest/:id_request/offer/:id_offer", Users.deleteOffer)

router
  .get("/request", Request.allRequests)
  .get("/request/:id", Request.getRequest)
  .post("/request/", Request.postRequest)
  .put("/request/:id", Request.putRequest)
  .delete("/request/:id", Request.disableRequest);

router
  .get("/offer", Offer.allOffers)
  .get("/offer/:id", Offer.getOffer)
  .put("/offer/:id", Offer.putOffer)
  .delete("/offer/:id", Offer.disableOffer);

router
  .get("/*", (req, res)=>{
    res.status(404).send("404");
  });

export default router;