import { Router } from 'express'
import { TeamController } from '../controllers/teamController.js'

export const createTeamRouter = (TeamModel) => {


  const teamsRouter = Router()
  const teamController = new TeamController(TeamModel);
  
  teamsRouter.post('', teamController.create.bind(teamController));
  teamsRouter.get('', teamController.getAll.bind(teamController)); 
  teamsRouter.get('/:teamID', teamController.getById.bind(teamController));
  teamsRouter.put('/:teamID', teamController.update.bind(teamController));
  teamsRouter.delete('/:teamID', teamController.delete.bind(teamController));
  return teamsRouter
}
