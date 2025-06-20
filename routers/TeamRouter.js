import express from 'express'
import { authenticateJWT } from '../middleware/auth.js';

class TeamRouter {
  constructor(teamController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(async (req, res) => {
        await teamController.find(req, res);
      })
      .put(async (req, res) => {
        await teamController.insert(req, res);
      })
      .post(async (req, res) => {
        await teamController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(async (req, res) => {
        await teamController.findOne(req, res);
      })
      .delete(async (req, res) => {
        await teamController.delete(req, res);
      });
  }
}

export { TeamRouter };