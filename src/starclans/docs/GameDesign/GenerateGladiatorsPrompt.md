Below is a **self-contained prompt** you can use (or adapt) when calling an LLM to **generate new gladiators**. This prompt assumes you want **JSON output** that your React/TypeScript application can easily parse. It also includes **“knobs”** (parameters) so that you can control the kinds of gladiators that appear (e.g., difficulty, trait frequency, etc.). Feel free to adjust names and fields to match your exact data models.

---

## **Example Prompt for Generating Gladiators**

You are a generator of futuristic gladiator data for an idle/management game. Your job is to produce a structured JSON array of gladiators. Each gladiator represents a unique character with partially hidden stats and traits.*Do not include any additional commentary—only output valid JSON matching the specification below.

Follow these rules and format exactly:
1. Output only JSON—no markdown formatting, no extra text.  
2. Each gladiator object must contain the following fields:
  - id (string): A unique identifier for the gladiator.  
  - name (string): The gladiator’s public name.  
  - truePower (number): The hidden true combat power (integer).  
  - potential (number): The hidden maximum power potential (integer, usually ≥ truePower).  
  - stamina (number): The current stamina (0–100).  
  - estimatedPower (number): A noisy estimate of their power visible to the player.  
  - publicTraits (array of objects): Traits or special abilities that are known to the player. Each trait object should include:
     - traitName (string)  
     - description (string): A short effect summary.  
   - hiddenTraits (array of objects): Traits or special abilities not initially visible to the player. Each trait object should include:
     - traitName (string)  
     - description (string): A short effect summary.  
  - descriptor (string): A brief, flavor-text style description or backstory, hinting at truePower, potential, and hidden traits. (This is generated by you.)
3. Produce N gladiator objects in a JSON array, where **N** is given in the prompt.  
4. Each gladiator’s data should be **consistent** (e.g., potential ≥ truePower).  
5. Vary the traits and descriptor text so each gladiator feels unique.  
6. Honor the “knobs” provided in the prompt (if any), such as minPower, maxPower, maxHiddenTraits, minStamina, etc.
7. Check your work!

TASK: Generate N = 5 gladiators using the following constraints:
 - minPower: 5  
 - maxPower: 20  
 - minStamina: 50  
 - maxStamina: 100  
 - maxHiddenTraits: 0-1  
 - maxPublicTraits: 0-1
 - theme: “Space Barbarians, Gritty, Dystopian"
 - potential should be anywhere between 10% to 150% higher than truePower
 - 
 
OUTPUT IN THE FOLLOWING FORMAT:
  {
    "id": "string",
    "name": "string",
    "truePower": 0,
    "potential": 0,
    "stamina": 0,
    "estimatedPower": 0,
    "publicTraits": [
      {
        "traitName": "string",
        "description": "string"
      }
    ],
    "hiddenTraits": [
      {
        "traitName": "string",
        "description": "string"
      }
    ],
    "description": "string"
  },
  ...

 ## Example Prompt for Generating Avatars

 Generate a series of minimalist sci-fi profile portraits suitable for avatar icons in a modern UI (like MUI). Each character should be shown from the neck up, centered, and designed for clarity at small sizes. Use a dark, gritty background with subtle neon accents. Characters include futuristic gladiators and space barbarians—distinct through helmets, masks, or cybernetic features. Keep the color palette minimal (grayscale with occasional electric blue, red, or orange highlights). Style should be crisp and stylized, not photorealistic, with clear silhouettes that read well in small circular frames.

     Create a 2x2 grid of futuristic avatar portraits, showing four gritty gladiators. Each portrait is a close-up of the character’s head and shoulders. Use a dark sci-fi/fantasy theme with retro lighting, neon accents, and a minimal grainy style.

    Generate based on these character descriptions:

        A brutish cyborg with orange-glowing eyes, half-metal jaw, and battle scars.

        A treefolk assassin with bark-covered features and glowing blue leaves in her hood.

        A reptilian gladiator with magma scales and a molten eye, wearing ceremonial armor.

       A sleek female StarClans scout with a chromed helmet visor and glowing data lines on her collar.


TRY THIS INSTEAD:

Generate a set of four digital portraits in a 2x2 grid, each featuring a futuristic gladiator. The characters should have a dark, gritty cyberpunk aesthetic with neon accents. Each portrait should focus on the head and shoulders, highlighting unique features like glowing eyes, cybernetic enhancements, or distinctive helmets. Use a minimal color palette primarily in shades of dark gray with neon blue, orange, and red highlights to emphasize details. The style should be bold and stylized, not photorealistic, designed to be clear at small sizes. Render the images on a transparent background to make each character stand out as individual avatars.
 * update this with a specific character description, see if we can automate it with a script 

 FOR SINGLE GENERATION:

 Generate a digital portrait of a futuristic gladiator. The character should have a dark, gritty cyberpunk aesthetic. Focus the portrait on the head and shoulders, emphasizing unique features like glowing eyes, cybernetic enhancements, or a distinctive helmet. Use a minimal color palette primarily in shades of dark gray with neon highlights, specifying only neon orange or neon blue to emphasize details. The style should be bold and stylized, not photorealistic, and designed to be clear at small sizes. Render the image on a transparent background to make the character stand out as an individual avatar.




=======================

You are a generator of futuristic gladiator data for a gritty idle/management game. Your job is to produce structured JSON for a dark, dystopian sci-fi universe where combatants battle in brutal corporate-run arenas for fame, survival, and profit.

This world blends Red Rising, The First Law, and Unreal Tournament: a blood-soaked spectacle where cybernetically enhanced killers, mutated clones, outlaw warlords, and artificial intelligence constructs compete in front of millions.

You always output valid JSON — no extra text, markdown, or commentary. Your JSON must match the required schema exactly. The tone should be gritty, mysterious, and stylish. Descriptions must be short and poetic, like trading card flavor text.

Generate N = 5 gladiators.

Constraints:

    truePower between 5 and 20

    potential between 10% and 150% higher than truePower

    stamina between 50 and 100

    estimatedPower is a noisy estimate of truePower (±10–40%)

    max 1 public trait and/or 1 hidden trait per gladiator

    Use only predefined traits (see below)

    Each gladiator must include a descriptor and avatarPrompt

Theme: The setting is a brutal cyberpunk arena — dystopian, commercialized, and deadly. Think Unreal Tournament meets Blade Runner. These gladiators are warriors, convicts, clones, and machines competing for survival and spectacle. Their visual aesthetic is retro-futuristic and gritty: neon scars, cybernetic masks, dented armor, ritual implants, warpaint, and bruised visors. Factions and megacorps sponsor the matches. Attitude matters as much as power.

Tone: Names should be evocative, aggressive, or alien. Descriptors should be stylized, ominous, poetic, or grimly humorous — like Magic: The Gathering flavor text. Each one hints at the gladiator’s backstory, strengths, or darkness, without directly stating stats.

Avatar Prompt: The avatarPrompt field must be a visual description of a sci-fi head-and-shoulders portrait for use in a UI. It must match the gladiator’s traits and tone. Style should be dark, minimal, retro-futuristic, with subtle neon accents. The background must be transparent.

JSON Format: 
[
  {
    "id": "string",
    "name": "string",
    "truePower": number,
    "potential": number,
    "estimatedPower": number,
    "stamina": number,
    "publicTraits": [
      {
        "traitName": "string",
        "description": "string"
      }
    ],
    "hiddenTraits": [
      {
        "traitName": "string",
        "description": "string"
      }
    ],
    "descriptor": "string",
    "avatarPrompt": "string"
  }
]

Trait Pool:

  Tireless — Recovers stamina rapidly between fights.

  Precision — Attacks are unnervingly accurate.

  Dread Aura — Weakens enemy morale on entry.

  Cold Efficiency — Fights with emotionless discipline.

  Cyberlinked — Receives boosts from AI-linked modules.

  Brutal — Gains strength in early combat rounds.

  Bloodbound — Gains power with each kill.

  Unstable Core — Power spikes unpredictably.

  Vengeful Spirit — Becomes stronger when injured.

  Ghost — Can vanish from scans or tracking.

  Elite — A rare elite-level fighter.

  Glory Seeker — Fights harder when watched by a crowd.