import { Router } from "express";
import {
  fetchIntention,
  processIntention,
  registerIntention,
  registerMember,
} from "./controller";

export const router = Router();

//Intentions
router.post("/applications", registerIntention);

//Admin
router.get("/admin/applications", fetchIntention);
router.put("/admin/applications/status", processIntention);

//Members
router.post("/members", registerMember);
