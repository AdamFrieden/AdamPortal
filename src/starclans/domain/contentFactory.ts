import { Gladiator } from "./models";
import { allGladiators } from "./allGladiators";

export class ContentFactory {
  private pool: Gladiator[];

  constructor() {
    // Make a local copy so we can remove gladiators from it without affecting the original array
    this.pool = [...allGladiators];
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
}