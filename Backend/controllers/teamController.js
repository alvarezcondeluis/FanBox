
import {TeamService} from '../services/teamService.js';

export class TeamController {
  
  constructor(TeamModel) {
    this.teamService = new TeamService(TeamModel);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    
  }


  async getAll(req, res, next) {
    try {
      const filters = req.query;
      const teams = await this.teamService.getAll(filters);
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const team = req.body;
      const newTeam = await this.teamService.create(team);
      res.status(201).json(newTeam);
    } catch (error) {
      next(error);
    }
  
  }

  async getById(req, res, next) {
    try {
      const { teamID } = req.params;
      const team = await this.teamService.getById(teamID);
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ error: 'Team not found', code: 'NOT_FOUND' }); 
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { teamID } = req.params;
      
      const updatedTeam = await this.teamService.update(teamID, req.body);
      if (updatedTeam) {
        res.status(200).json(updatedTeam);
      } else {
        res.status(404).json({ error: 'Team not found', code: 'NOT_FOUND' }); 
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { teamID } = req.params;
      const success = await this.teamService.delete(teamID);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Team not found', code: 'NOT_FOUND' });
      }
    } catch (error) {
      next(error);
    }
  }
  
}
