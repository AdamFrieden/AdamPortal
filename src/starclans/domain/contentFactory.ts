import { Battle, Gladiator } from "./models";
import { allGladiators } from "./allGladiators";
import { enemyGladiators } from "./enemyGladiators";

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

  public getRandomBattle(): Battle {
    const id = crypto.randomUUID();
    const randomHours = Math.floor(Math.random() * 5) + 1;
    const randomResourcium = Math.floor(Math.random() * 1000) + 1000;
    const randomPlayerGladiatorSlots = Math.floor(Math.random() * 3) + 1;
    const randomEnemyGladiatorSlots = Math.floor(Math.random() * 3) + 1;

    return {
      id,
      name: `Battle ${id}`,
      description: `Battle ${id} description`,
      startTime: Date.now() + (randomHours * 60 * 60 * 1000),
      playerGladiators: [],
      enemyGladiators: this.getRandomEnemyGladiators(randomEnemyGladiatorSlots),
      status: 'NOT_STARTED',
      resourcium: randomResourcium,
      playerGladiatorSlots: randomPlayerGladiatorSlots,
    }
  }
}