import { Router } from "express";
import {
  authenticateMember,
  fetchIntention,
  processIntention,
  registerIntention,
  registerMember,
} from "./controller";
import { ensureAuthenticated, ensureRole } from "./middleware";

export const router = Router();

//Intentions
router.post("/applications", registerIntention);

//Admin
router.get(
  "/admin/applications",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  fetchIntention,
);
router.put(
  "/admin/applications/status",
  ensureAuthenticated,
  ensureRole("ADMIN"),
  processIntention,
);

//Members
router.post("/members", registerMember);
router.post("/sessions", authenticateMember);
