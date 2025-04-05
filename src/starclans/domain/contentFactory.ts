import { Gladiator, BattleConfig, BattleResult, ClientGladiator, toClientGladiator } from "./models";
import { allGladiators } from "./allGladiators";
import { enemyGladiators } from "./enemyGladiators";
import { getRandomInt } from "../context/helpers";

export class ContentFactory {
  private pool: Gladiator[];
  private enemyPool: Gladiator[];

  constructor() {
    // Make a local copy so we can remove gladiators from it without affecting the original array
    this.pool = [...allGladiators];
    this.enemyPool = [...enemyGladiators];
  }

  /**
   * Returns a random Gladiator from the pool and removes it, so it cannot be chosen again.
   * Returns undefined if no gladiators remain.
   */
  public getRandomGladiator(): Gladiator {
    if (this.pool.length === 0) {
      throw new Error('No gladiators left in factory!');
    }

    const index = Math.floor(Math.random() * this.pool.length);
    const chosenGladiator = this.pool[index];

    // Swap-and-pop for efficient removal
    const lastIndex = this.pool.length - 1;
    [this.pool[index], this.pool[lastIndex]] = [this.pool[lastIndex], this.pool[index]];
    this.pool.pop();

    return chosenGladiator;
  }

  public getRandomGladiators(count: number): Gladiator[] {
    // If the pool is smaller than count, only return what's available
    const totalToGrab = Math.min(count, this.pool.length);
    const gladiators: Gladiator[] = [];
  
    for (let i = 0; i < totalToGrab; i++) {
      gladiators.push(this.getRandomGladiator()!);
    }
    return gladiators;
  }

  public getRandomEnemyGladiator(): Gladiator {
    if (this.enemyPool.length === 0) {
        throw new Error('No enemy gladiators left in factory!');
    }
    const index = Math.floor(Math.random() * this.enemyPool.length);
    const chosenGladiator = this.enemyPool[index];

    // Swap-and-pop for efficient removal
    const lastIndex = this.enemyPool.length - 1;
    [this.enemyPool[index], this.enemyPool[lastIndex]] = [this.enemyPool[lastIndex], this.enemyPool[index]];
    this.enemyPool.pop();
    
    // Set stamina to a random value between 50-100
    chosenGladiator.stamina = Math.floor(Math.random() * 51) + 50;
    
    return chosenGladiator;
  }

  public getRandomEnemyGladiators(count: number): Gladiator[] {
    // If the pool is smaller than count, only return what's available
    const totalToGrab = Math.min(count, this.enemyPool.length);
    const gladiators: Gladiator[] = [];
  
    for (let i = 0; i < totalToGrab; i++) {
        gladiators.push(this.getRandomEnemyGladiator());
    }
    return gladiators;
  }

  /**
   * Creates a battle configuration based on the scan result type
   * @param scanResultType The type of scan result that triggered this battle
   * @returns A BattleConfig object with appropriate parameters
   */
  public createBattleConfig(scanResultType: string): BattleConfig {
    const id = crypto.randomUUID();
    
    // Different battle configurations based on scan result type
    switch (scanResultType) {
      case 'threat':
        return {
          id,
          name: 'Eliminate Threat',
          description: 'A dangerous threat has been detected. Send your gladiators to eliminate it.',
          maxPlayerSlots: 3,
          minOpponentCount: 2,
          maxOpponentCount: 4,
          durationMs: 1000 * 60 * 5, // 5 minutes
          potentialRewards: {
            resourcium: getRandomInt(50, 150)
          }
        };
      case 'opportunity':
        return {
          id,
          name: 'Seize Opportunity',
          description: 'A valuable opportunity has been discovered. Send your gladiators to capitalize on it.',
          maxPlayerSlots: 2,
          minOpponentCount: 1,
          maxOpponentCount: 3,
          durationMs: 1000 * 60 * 3, // 3 minutes
          potentialRewards: {
            resourcium: getRandomInt(30, 100)
          }
        };
      case 'resource':
        return {
          id,
          name: 'Secure Resources',
          description: 'Valuable resources have been located. Send your gladiators to secure them.',
          maxPlayerSlots: 4,
          minOpponentCount: 3,
          maxOpponentCount: 5,
          durationMs: 1000 * 60 * 7, // 7 minutes
          potentialRewards: {
            resourcium: getRandomInt(100, 300)
          }
        };
      default:
        // Default battle configuration
        return {
          id,
          name: 'Battle',
          description: 'A battle has been initiated.',
          maxPlayerSlots: 3,
          minOpponentCount: 2,
          maxOpponentCount: 4,
          durationMs: 1000 * 60 * 5, // 5 minutes
          potentialRewards: {
            resourcium: getRandomInt(50, 150)
          }
        };
    }
  }

  /**
   * Creates a new battle result based on a battle config and selected gladiators
   * @param config The battle configuration
   * @param playerGladiators The gladiators selected by the player
   * @returns A BattleResult object
   */
  public createBattleResult(
    config: BattleConfig, 
    playerGladiators: ClientGladiator[]
  ): BattleResult {
    const id = crypto.randomUUID();
    const now = Date.now();
    
    // Generate opponent gladiators based on the config
    const opponentCount = getRandomInt(config.minOpponentCount, config.maxOpponentCount);
    const opponentGladiators = this.getRandomEnemyGladiators(opponentCount)
      .map(toClientGladiator);
    
    // Calculate total power
    const playerPower = playerGladiators.reduce(
      (sum, glad) => sum + Math.round(glad.estimatedPower * glad.stamina * 0.01), 
      0
    );
    
    const opponentPower = opponentGladiators.reduce(
      (sum, glad) => sum + Math.round(glad.estimatedPower * glad.stamina * 0.01), 
      0
    );
    
    return {
      id,
      configId: config.id,
      startTime: now,
      durationMs: config.durationMs,
      status: 'NOT_STARTED',
      playerGladiators,
      opponentGladiators,
      playerPower,
      opponentPower,
      outcome: 'DRAW' // Will be determined when battle completes
    };
  }
}