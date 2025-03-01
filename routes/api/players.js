import express from "express";
import * as playersController from "../../controllers/playersController.js";
import ROLES_LIST from "../../configs/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";

const router = express.Router();

router
  .route("/")
  .get(playersController.getAllPlayers)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    playersController.addPlayer
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    playersController.updatePlayer
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    playersController.deletePlayer
  );

router.route("/:id").get(playersController.getPlayer);

export default router;
