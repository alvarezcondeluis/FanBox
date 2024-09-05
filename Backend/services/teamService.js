

import {validateTeam} from '../schemas/team.js';
import { ServiceError } from '../utils/serviceError.js'; 
export class TeamService {
    constructor(TeamModel) {
      this.TeamModel = TeamModel;
    }
  
    async getAll() {
      try {
        return await this.TeamModel.findAll();
      } catch (error) {
        throw new Error('Error fetching teams: ' + error.message);
      }
    }

    async getById(teamID) {
      
      try {
        return await this.TeamModel.findByPk(teamID);
      } catch (error) {
        throw new Error('Error fetching team: ' + error.message);
      }
    }


    async create(team) {
      
      
      const { success } = validateTeam(team);

      if (!success) {
        
        const errorMessages = error.errors.map(err => err.message);
        throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
      }
      
      try {
        
        return await this.TeamModel.create(team);
      } catch (error) {
        throw new Error('Error creating team: ' + error.message);
      }
    }


    async update(teamID, team) {
      try {

        const { success, error, data } = validateTeam(team);

        if (!success) {
          const errorMessages = error.errors.map(err => err.message);
          throw new ServiceError(`Validation error: ${errorMessages.join(', ')}`, 'VALIDATION_ERROR');
        }

        // Aqui lo hago desestructurando un unico valor porque puede darse el caso en el que no se actualice con ningun valor y de error
        const [rowsUpdated] = await this.TeamModel.update(data, {
          where: { teamID }
        });
  
        if (rowsUpdated) {
          return data;
        } else {
          return null;
        }
      } catch (error) {
        throw new Error('Error updating team: ' + error.message);
      }
    }

    async delete(teamID) {
      try {
        const rowsDeleted =  await this.TeamModel.destroy({where: {teamID}});
        
        if (rowsDeleted) {
          return true;
        } else { 
          return false;
        }
      } catch (error) {
        throw new Error('Error deleting team: ' + error.message);
      }
    }

}
