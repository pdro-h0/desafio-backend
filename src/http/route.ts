import { Router } from "express";
import {
  fetchIntention,
  processIntention,
  registerIntention,
} from "./controller";

export const router = Router();

router.post("/applications", registerIntention);

router.get("/admin/applications", fetchIntention);
router.put("/admin/applications/status", processIntention);
