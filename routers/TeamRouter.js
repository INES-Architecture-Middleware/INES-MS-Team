import express from 'express'
import { authenticateJWT } from '../middleware/auth.js';

class TeamRouter {
  constructor(teamController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(authenticateJWT, async (req, res) => {
        await teamController.find(req, res);
      })
      .put(authenticateJWT, async (req, res) => {
        await teamController.insert(req, res);
      })
      .post(authenticateJWT, async (req, res) => {
        await teamController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(authenticateJWT, async (req, res) => {
        await teamController.findOne(req, res);
      })
      .delete(authenticateJWT, async (req, res) => {
        await teamController.delete(req, res);
      });
  }
}

export { TeamRouter };