export interface ResearchTask {
  id: string;
  name: string;
  startTime: number;
  durationMs: number;
  completed: boolean;
}

export type GladiatorStatus = 'RESTING' | 'TRAINING' | 'CONFLICT' | 'ENSLAVED';

// Add scan types
export type ScanStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface ScanResult {
  id: string;
  type: string; // 'opportunity', 'threat', 'resource', etc.
  description: string;
  reward?: string;
}

export interface StellarScan {
  id: string;
  startTime: number;
  durationMs: number;
  status: ScanStatus;
  results?: ScanResult[];
}

export interface Gladiator {
  id: string;
  name: string;
  stamina: number;
  estimatedPower: number;
  knownTraits: string[];
  truePower: number;
  hiddenTraits: string[];
  description: string;
  status: GladiatorStatus;
  lastRefresh: number;  // do I really want to track a timestamp on each gladiator? should this just be on gamestate? this might make sense given the game design - could even add tests to make sure a returned gamestate has refreshed entities?
}

//  this currently represents everything persisted on the db AND whatever is needed to display in the app
//  eventually the db and gameengine will have other data it persists that is never sent to the app
export interface GameState {
  researchTasks?: ResearchTask[];
  lastRefresh: number;
  debugTimeOffset: number; // Time offset for debugging
  clanName: string;
  resourcium: number;
  roster: Gladiator[];
  rosterCapacity: number;
  waiverWire: Gladiator[];
  activeScan?: StellarScan; // Add active scan to the game state
  scanHistory?: StellarScan[]; // Add scan history
  //  need some 'waiver wire' collection for available gladiators
}

export type ClientGameState = Omit<GameState, 'roster'> & {
  roster: ClientGladiator[];
}

export type ClientGladiator = Omit<Gladiator, 'truePower' | 'hiddenTraits'>

// translate full Gladiator objects used by the gameEngine to a ClientGladiator object used by the UI
// make sure to hide truePower and hiddenTraits from the client
export function toClientGladiator(gladiator: Gladiator): ClientGladiator {
  // Use object destructuring to remove 'truePower'
  const { truePower, hiddenTraits, ...clientGladiator } = gladiator;
  return clientGladiator;
}



// function for translating a full GameState used by the gameEngine into a ClientGameState used by the UI
// this separation serves to only expose certain aspects of the game to the frontend
export function toClientGameState(state: GameState): ClientGameState {
  return {
    // Spread the original state but override 'gladiators'
    ...state,
    roster: state.roster.map(toClientGladiator),
  };
}

export function emptyGameState(): GameState {
  return {
    clanName: '',
    roster: [],
    researchTasks: [],
    resourcium: 0,
    debugTimeOffset: 0,
    lastRefresh: 0,
    rosterCapacity: 0,
    waiverWire: [],
    scanHistory: []
  }
}

export interface PlayerActionResult<T extends GameState | ClientGameState> {
  state: T
  actionSuccess: boolean;
}

  // Action types as const
  export const ACTION_TYPES = {
    START_RESEARCH: 'START_RESEARCH',
    CANCEL_RESEARCH: 'CANCEL_RESEARCH',
    DROP_GLADIATOR: 'DROP_GLADIATOR',
    REST_GLADIATOR: 'REST_GLADIATOR',
    TRAIN_GLADIATOR: 'TRAIN_GLADIATOR',
    RECRUIT_GLADIATOR: 'RECRUIT_GLADIATOR',
    START_SCAN: 'START_SCAN', // Initiate a stellar scan
  } as const;

//  keep player action extremely minimal - eventually pass these over the wire so they can be consumed by the real gameEngine in AWS.
//  make sure nothing about the player action is authoritative. it should only convey intent. gameEngine should verify access and costs, etc.
interface BasePlayerAction {
  type: string;
}

export interface StartResearchAction extends BasePlayerAction {
  type: typeof ACTION_TYPES.START_RESEARCH;
  researchId: string;
}

export interface CancelResearchAction extends BasePlayerAction {
  type: 'CANCEL_RESEARCH'
  researchId: string;
}

interface PlayerGladiatorAction extends BasePlayerAction {
  gladiatorId: string;
}

export interface DropGladiatorAction extends PlayerGladiatorAction {
  type: typeof ACTION_TYPES.DROP_GLADIATOR;
}

export interface RestGladiatorAction extends PlayerGladiatorAction {
  type: typeof ACTION_TYPES.REST_GLADIATOR;
}

export interface TrainGladiatorAction extends PlayerGladiatorAction {
  type: typeof ACTION_TYPES.TRAIN_GLADIATOR;
}

export interface RecruitGladiatorAction extends PlayerGladiatorAction {
  type: typeof ACTION_TYPES.RECRUIT_GLADIATOR;
}

export interface StartStellarScanAction extends BasePlayerAction {
  type: typeof ACTION_TYPES.START_SCAN;
}

export type PlayerAction = StartResearchAction 
  | CancelResearchAction 
  | DropGladiatorAction 
  | RestGladiatorAction 
  | TrainGladiatorAction
  | RecruitGladiatorAction
  | StartStellarScanAction

export interface Battle {
  // label
  id: string;
  name: string;
  description: string;

  // state
  startTime: number;
  playerGladiators: ClientGladiator[];
  enemyGladiators: ClientGladiator[];
  status: BattleStatus;

  // rewards
  resourcium: number;

  // constraints
  playerGladiatorSlots: number;
}

export type BattleStatus = 'NOT_STARTED' 
  | 'ENGAGED'     //  player has saved gladiators to the battle but it hasn't started yet
  | 'COMPLETED';  //  battle has been resolved with whatever gladiators were in slots / saved
