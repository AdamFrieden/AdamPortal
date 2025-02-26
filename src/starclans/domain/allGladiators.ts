// allGladiators.ts

import { Gladiator } from "./models";

/**
 * A starter set of 50 Gladiators following the given criteria:
 * 1) truePower in [5..50] (with lower numbers more common).
 * 2) 0-2 known traits, 0-1 hidden traits from this trait list:
 *    Fast, Lucky, Tactical, Stalwart, Bloodthirsty, Tireless,
 *    Adamant, Hunter, Mechslayer, Ghost, Cunning, Immortal, Savage.
 * 3) estimatedPower is a "noisy guess" of truePower, also [5..50],
 *    sometimes higher, sometimes lower.
 * 4) description: short, artistic text hinting at the Gladiator’s nature.
 * 5) Names are unique and thematic.
 *
 * Additional fields (as requested):
 *  - stamina (default: 0)
 *  - status (default: 'RESTING')
 *  - lastRefresh (default: 0)
 */

export const allGladiators: Gladiator[] = [
  {
    name: "Carius Thornpeak",
    stamina: 0,
    estimatedPower: 7,
    knownTraits: ["Lucky"],
    truePower: 6,
    hiddenTraits: [],
    description:
      "A wiry survivor whose good fortune spares him from every lethal blow.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Thaliana Volaris",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: [],
    truePower: 9,
    hiddenTraits: ["Fast"],
    description:
      "Silence shrouds her steps, and by the time you see her, it may be too late.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Zenara Frostbreach",
    stamina: 0,
    estimatedPower: 8,
    knownTraits: ["Cunning"],
    truePower: 12,
    hiddenTraits: [],
    description:
      "Cool-headed tactician, rumored to watch her foes crumble before her subtle arts.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Veraxus Ironbrand",
    stamina: 0,
    estimatedPower: 20,
    knownTraits: ["Tireless"],
    truePower: 15,
    hiddenTraits: [],
    description:
      "A ceaseless engine of war, whose determined stride halts only at final victory.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Othalia Embergrave",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: ["Savage"],
    truePower: 7,
    hiddenTraits: [],
    description:
      "A howling presence on the battlefield, though her fury eclipses her size.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Carrelian Windreaver",
    stamina: 0,
    estimatedPower: 9,
    knownTraits: ["Fast", "Stalwart"],
    truePower: 10,
    hiddenTraits: [],
    description:
      "Faster than a blink yet unshaken by thunder, he’s a tempest in human form.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Nerissa Ravenpeak",
    stamina: 0,
    estimatedPower: 10,
    knownTraits: ["Bloodthirsty"],
    truePower: 13,
    hiddenTraits: ["Ghost"],
    description:
      "She hunts in moonlight with a hunger unquenched, footsteps fading like whispers in the dark.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Varconius Blacktide",
    stamina: 0,
    estimatedPower: 25,
    knownTraits: ["Hunter"],
    truePower: 18,
    hiddenTraits: [],
    description:
      "An ocean of relentless pursuit, known to chase prey across land, sea, and spirit.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Galliana Flinthelm",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: ["Adamant"],
    truePower: 8,
    hiddenTraits: [],
    description:
      "A quiet sentinel who stands even when battered by storms of steel.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Morvion Steelshard",
    stamina: 0,
    estimatedPower: 22,
    knownTraits: ["Tactical"],
    truePower: 28,
    hiddenTraits: ["Lucky"],
    description:
      "His strategies cut deeper than any blade, and fate itself seems compelled to comply.",
    status: "RESTING",
    lastRefresh: 0,
  },

  // 10
  {
    name: "Zellaris Moonthorn",
    stamina: 0,
    estimatedPower: 6,
    knownTraits: [],
    truePower: 5,
    hiddenTraits: ["Cunning"],
    description:
      "A fragile silhouette cloaked in silver threads, quietly weaving each foe’s downfall.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Hadrian Voidscar",
    stamina: 0,
    estimatedPower: 10,
    knownTraits: ["Savage"],
    truePower: 16,
    hiddenTraits: [],
    description:
      "The very sight of his unbridled rage sends lesser warriors trembling into retreat.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Tarena Dawnreaver",
    stamina: 0,
    estimatedPower: 14,
    knownTraits: ["Stalwart", "Tireless"],
    truePower: 11,
    hiddenTraits: [],
    description:
      "Steadfast as the sunrise, forging onward when all others would yield or break.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Xander Stormfist",
    stamina: 0,
    estimatedPower: 26,
    knownTraits: ["Adamant"],
    truePower: 30,
    hiddenTraits: [],
    description:
      "He channels the fury of an endless gale, fists striking with unwavering resolve.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Calyssa Emberthorn",
    stamina: 0,
    estimatedPower: 27,
    knownTraits: ["Fast"],
    truePower: 22,
    hiddenTraits: [],
    description:
      "A fiery blur, swift as dancing embers, whose blade flickers unexpectedly.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Garius Hollowbane",
    stamina: 0,
    estimatedPower: 9,
    knownTraits: ["Bloodthirsty"],
    truePower: 14,
    hiddenTraits: ["Immortal"],
    description:
      "His thirst for battle transcends mortal boundaries; rumors say death refuses him.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Evaros Windstalker",
    stamina: 0,
    estimatedPower: 39,
    knownTraits: ["Hunter", "Savage"],
    truePower: 34,
    hiddenTraits: [],
    description:
      "A relentless silhouette prowling the dunes, guided by a primal storm within.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Corvina Vexlight",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: [],
    truePower: 9,
    hiddenTraits: ["Ghost"],
    description:
      "A mysterious entity whose presence flickers at the edge of vision in swirling gloom.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Balric Dreadspire",
    stamina: 0,
    estimatedPower: 40,
    knownTraits: ["Mechslayer"],
    truePower: 46,
    hiddenTraits: [],
    description:
      "Metal foes crumble at his step, as though forged steel cannot withstand his wrath.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Vitaria Stormclaw",
    stamina: 0,
    estimatedPower: 10,
    knownTraits: ["Tactical"],
    truePower: 17,
    hiddenTraits: ["Lucky"],
    description:
      "Calmly orchestrates each strike, her luck shining brightest in the direst moments.",
    status: "RESTING",
    lastRefresh: 0,
  },

  // 20
  {
    name: "Ulric Voidhowl",
    stamina: 0,
    estimatedPower: 15,
    knownTraits: ["Cunning"],
    truePower: 19,
    hiddenTraits: [],
    description:
      "A cunning conjurer of illusions, weaving darkness into deadly surprise.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Mariana Ironwing",
    stamina: 0,
    estimatedPower: 35,
    knownTraits: ["Stalwart"],
    truePower: 29,
    hiddenTraits: ["Ghost"],
    description:
      "She never falls behind her shield, yet her shape sometimes flickers beyond mortal bounds.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Lorian Quicksunder",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: ["Fast"],
    truePower: 8,
    hiddenTraits: [],
    description:
      "When the dust settles, he’s already behind you, blade humming in the aftermath.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Syrana Duskbane",
    stamina: 0,
    estimatedPower: 21,
    knownTraits: ["Adamant", "Hunter"],
    truePower: 27,
    hiddenTraits: [],
    description:
      "She tracks her prey with unwavering focus, forging on even against dawn’s final embers.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Alistor Irongrip",
    stamina: 0,
    estimatedPower: 8,
    knownTraits: [],
    truePower: 10,
    hiddenTraits: ["Tireless"],
    description:
      "A quiet sentinel who never loosens his grip, rumored to outlast any mortal flesh.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Ferox Nightglade",
    stamina: 0,
    estimatedPower: 6,
    knownTraits: ["Lucky"],
    truePower: 5,
    hiddenTraits: [],
    description:
      "A wisp of fortune trails him, deflecting lethal blows and guiding serendipitous strikes.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Terriana Gravesong",
    stamina: 0,
    estimatedPower: 45,
    knownTraits: ["Immortal"],
    truePower: 39,
    hiddenTraits: [],
    description:
      "Legends say she has perished a hundred times, only to return from beyond the veil.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Jothan Riftbane",
    stamina: 0,
    estimatedPower: 18,
    knownTraits: ["Bloodthirsty"],
    truePower: 13,
    hiddenTraits: [],
    description:
      "His lust for the fray often oversells his actual might, yet none doubt his ferocity.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Darius Valtross",
    stamina: 0,
    estimatedPower: 20,
    knownTraits: ["Tireless"],
    truePower: 25,
    hiddenTraits: ["Savage"],
    description:
      "An unstopping juggernaut whose savage core emerges only when cornered.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Elysara Doomchaser",
    stamina: 0,
    estimatedPower: 36,
    knownTraits: ["Stalwart"],
    truePower: 42,
    hiddenTraits: [],
    description:
      "Each resolute step echoes in the hearts of her adversaries, chasing doom across arenas.",
    status: "RESTING",
    lastRefresh: 0,
  },

  // 30
  {
    name: "Astaria Shadewhisper",
    stamina: 0,
    estimatedPower: 7,
    knownTraits: ["Cunning"],
    truePower: 11,
    hiddenTraits: [],
    description:
      "Slips between shadows, weaving illusions that lure foes to their downfall.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Malick Devourbane",
    stamina: 0,
    estimatedPower: 30,
    knownTraits: ["Tactical"],
    truePower: 35,
    hiddenTraits: ["Mechslayer"],
    description:
      "A strategist adept at dismantling even the mightiest constructs, piece by brittle piece.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Roderic Strikewind",
    stamina: 0,
    estimatedPower: 28,
    knownTraits: ["Fast", "Hunter"],
    truePower: 20,
    hiddenTraits: [],
    description:
      "A gale on the open field, doggedly tracking any adversary with lightning strikes.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Marvellus Direwake",
    stamina: 0,
    estimatedPower: 18,
    knownTraits: [],
    truePower: 14,
    hiddenTraits: ["Ghost"],
    description:
      "A warrior of quiet demeanor, rumored to vanish when the killing blow should land.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Sylvara Thundertide",
    stamina: 0,
    estimatedPower: 45,
    knownTraits: ["Adamant"],
    truePower: 47,
    hiddenTraits: ["Immortal"],
    description:
      "She harnesses storms themselves, and her life seems boundless as thunder’s echo.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Jaravin Bladesong",
    stamina: 0,
    estimatedPower: 25,
    knownTraits: ["Tireless", "Savage"],
    truePower: 31,
    hiddenTraits: [],
    description:
      "He thrives in unending skirmish, forging primal chaos into a haunting melody of steel.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Kelden Marrowfall",
    stamina: 0,
    estimatedPower: 9,
    knownTraits: ["Lucky"],
    truePower: 6,
    hiddenTraits: ["Fast"],
    description:
      "Not the strongest by far, yet fortune and swiftness weave him out of harm’s way.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Lylanna Deepgloom",
    stamina: 0,
    estimatedPower: 12,
    knownTraits: ["Stalwart"],
    truePower: 9,
    hiddenTraits: [],
    description:
      "Her quiet endurance stands in stark contrast to the gloom that hangs about her.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Oridian Scalefang",
    stamina: 0,
    estimatedPower: 35,
    knownTraits: ["Cunning"],
    truePower: 40,
    hiddenTraits: [],
    description:
      "Calculates each swing with cold precision; woe betide those who think him brute force alone.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Syverus Thornwrath",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: [],
    truePower: 8,
    hiddenTraits: ["Savage"],
    description:
      "He lingers in civilized guise, until the moment his primal rage explodes without warning.",
    status: "RESTING",
    lastRefresh: 0,
  },

  // 40
  {
    name: "Faelix Direveil",
    stamina: 0,
    estimatedPower: 20,
    knownTraits: ["Bloodthirsty"],
    truePower: 26,
    hiddenTraits: [],
    description:
      "Drawn to the fury of conflict, his eyes gleam in the heat of an enemy’s last stand.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Cordelia Voidbloom",
    stamina: 0,
    estimatedPower: 15,
    knownTraits: ["Mechslayer"],
    truePower: 10,
    hiddenTraits: [],
    description:
      "Beneath her florid exterior rests an uncanny knack for rending gears and cogs asunder.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Horrin Bronzebearer",
    stamina: 0,
    estimatedPower: 50,
    knownTraits: ["Immortal"],
    truePower: 45,
    hiddenTraits: ["Ghost"],
    description:
      "A legend in bronze, stepping forth from myth’s shadow as though death were a distant rumor.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Vaeska Riftstalker",
    stamina: 0,
    estimatedPower: 25,
    knownTraits: ["Fast"],
    truePower: 33,
    hiddenTraits: [],
    description:
      "Tearing through space like a lightning bolt, never where you expect her next.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Dominus Coldhammer",
    stamina: 0,
    estimatedPower: 30,
    knownTraits: ["Tactical", "Stalwart"],
    truePower: 36,
    hiddenTraits: [],
    description:
      "Chiseled from ice and steel, commanding the field with unwavering discipline.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Elyssia Stormchain",
    stamina: 0,
    estimatedPower: 9,
    knownTraits: [],
    truePower: 16,
    hiddenTraits: ["Tireless"],
    description:
      "Her stamina never ebbs, lashing out like thunder until foes crumble under her relentless chain.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Meraxis Thornvale",
    stamina: 0,
    estimatedPower: 18,
    knownTraits: ["Adamant"],
    truePower: 21,
    hiddenTraits: ["Cunning"],
    description:
      "An unbreakable will cloaked in sly plans, shaping the battlefield before the foe even knows.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Ilyona Graveflare",
    stamina: 0,
    estimatedPower: 42,
    knownTraits: ["Bloodthirsty", "Savage"],
    truePower: 48,
    hiddenTraits: [],
    description:
      "Her wrath sears the night, leaving naught but embers where fearsome opponents once stood.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Kaelin Nightburn",
    stamina: 0,
    estimatedPower: 34,
    knownTraits: [],
    truePower: 27,
    hiddenTraits: ["Immortal"],
    description:
      "Within shifting shadows, her life’s flame proves impossible to snuff out.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Taronis Dreadmoor",
    stamina: 0,
    estimatedPower: 8,
    knownTraits: ["Lucky"],
    truePower: 5,
    hiddenTraits: [],
    description:
      "At the brink of annihilation, fortune intervenes in ways impossible to explain.",
    status: "RESTING",
    lastRefresh: 0,
  },

  // 50
  {
    name: "Serevan Emberstride",
    stamina: 0,
    estimatedPower: 12,
    knownTraits: ["Tireless"],
    truePower: 14,
    hiddenTraits: ["Ghost"],
    description:
      "Burning footsteps never falter, each echo haunted by a presence unseen.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Orlix Voidrender",
    stamina: 0,
    estimatedPower: 45,
    knownTraits: ["Savage"],
    truePower: 50,
    hiddenTraits: [],
    description:
      "A monstrous force at the peak of mortal power, leaving ruin in his wake.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Vallora Chainsong",
    stamina: 0,
    estimatedPower: 32,
    knownTraits: ["Fast", "Tactical"],
    truePower: 37,
    hiddenTraits: [],
    description:
      "Her sprint is a dance of ringing steel, choreographed to outsmart every foe.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Iskar Thundersoul",
    stamina: 0,
    estimatedPower: 35,
    knownTraits: ["Adamant"],
    truePower: 41,
    hiddenTraits: ["Lucky"],
    description:
      "His raw spirit crackles in the air, rarely yielding, aided by fate’s surprising turns.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Galatea Duskshard",
    stamina: 0,
    estimatedPower: 28,
    knownTraits: ["Stalwart"],
    truePower: 23,
    hiddenTraits: [],
    description:
      "Night’s gloom cannot dent her vigilant guard; she stands unwavering until dawn breaks.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Rothair Bonecinder",
    stamina: 0,
    estimatedPower: 9,
    knownTraits: [],
    truePower: 6,
    hiddenTraits: ["Mechslayer"],
    description:
      "Casts aside mechanical constructs as if they were mere chaff, hiding cunning behind small stature.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Averis Dewrend",
    stamina: 0,
    estimatedPower: 5,
    knownTraits: ["Cunning"],
    truePower: 11,
    hiddenTraits: [],
    description:
      "Unassuming but sly, unraveling opponents’ plans like thread from a worn cloak.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Loriana Scalebreak",
    stamina: 0,
    estimatedPower: 39,
    knownTraits: ["Bloodthirsty"],
    truePower: 44,
    hiddenTraits: ["Ghost"],
    description:
      "A vengeful spirit in mortal form, rumored to pass through barricades as though intangible.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Vorlan Gloomstride",
    stamina: 0,
    estimatedPower: 29,
    knownTraits: [],
    truePower: 25,
    hiddenTraits: ["Immortal"],
    description:
      "A restless wanderer who keeps reappearing across eras, never aging nor fading.",
    status: "RESTING",
    lastRefresh: 0,
  },
  {
    name: "Talia Grimcrest",
    stamina: 0,
    estimatedPower: 22,
    knownTraits: ["Fast"],
    truePower: 18,
    hiddenTraits: ["Savage"],
    description:
      "Sprinting through foes in a flash of steel, concealing a ferocious nature beneath agility.",
    status: "RESTING",
    lastRefresh: 0,
  },
];
