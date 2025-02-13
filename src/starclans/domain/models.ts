export interface ResearchTask {
  id: string;
  name: string;
  startTime: number;
  durationMs: number;
  completed: boolean;
}

export interface GameState {
  researchTasks: ResearchTask[];
  lastRefresh: number;
  timeTravelMs: number;
  clanName: string;
  resourcium: number;
}

export interface PlayerActionResult {
  success: boolean;
}

//  keep player action extremely minimal - eventually pass these over the wire so they can be consumed by the real gameEngine in AWS.
//  make sure nothing about the player action is authoritative. it should only convey intent. gameEngine should verify access and costs, etc.
export interface PlayerAction {
  type: string;
}

export interface StartResearchAction extends PlayerAction {
  type: 'START_RESEARCH';
  researchId: string;
}

export interface CancelResearchAction extends PlayerAction {
  type: 'CANCEL_RESEARCH'
  researchId: string;
}

export type GamePlayerAction = StartResearchAction | CancelResearchAction;