# At top of your script
import uuid, random, json, os, re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

ALL_TRAITS = [
    {"traitName": "Tireless", "description": "Recovers stamina rapidly between fights."},
    {"traitName": "Precision", "description": "Attacks are unnervingly accurate."},
    {"traitName": "Dread Aura", "description": "Weakens enemy morale on entry."},
    {"traitName": "Cold Efficiency", "description": "Fights with emotionless discipline."},
    {"traitName": "Cyberlinked", "description": "Receives boosts from AI-linked modules."},
    {"traitName": "Brutal", "description": "Gains strength in early combat rounds."},
    {"traitName": "Bloodbound", "description": "Gains power with each kill."},
    {"traitName": "Unstable Core", "description": "Power spikes unpredictably."},
    {"traitName": "Vengeful Spirit", "description": "Becomes stronger when injured."},
    {"traitName": "Ghost", "description": "Can vanish from scans or tracking."},
    {"traitName": "Elite", "description": "A rare elite-level fighter."},
    {"traitName": "Glory Seeker", "description": "Fights harder when watched by a crowd."}
]

INSPIRATIONS = [
    "a forgotten alien religion", "a clone rebelling against its creators",
    "an AI haunted by simulations", "a gladiator in a sentient exosuit",
    "a neural hacker obsessed with purity", "a psychic bonded to a weapon",
    "a cybernetic monk from the inner void", "a prototype built for audience spectacle"
]

TONES = ["poetic", "ironic", "grimly humorous", "mythic", "clinical", "tactical", "cryptic"]

VISUAL_MOTIFS = [
    "cracked chrome mask", "glowing spinal implants", "holographic tattoos",
    "ritual warpaint", "weathered exo-plating", "neon-lit scars", "fractured visor",
    "levitating HUD ring"
]

def generate_stat_block():
    true_power = random.randint(5, 20)
    potential = int(true_power * random.uniform(1.1, 2.5))
    estimated_power = int(true_power * random.uniform(0.6, 1.4))
    return true_power, potential, estimated_power

def choose_traits():
    return random.sample(ALL_TRAITS, k=random.choice([0, 1, 2]))

def build_prompt(glad_id, true_power, potential, estimated_power, traits, inspiration, tone, visual):
    stat_context = """
Stat Ranges:
- truePower: 5–20
- potential: 10%–150% above truePower
- estimatedPower: ±10–40% of truePower
"""
    trait_lines = "\n".join(f'- "{t["traitName"]} — {t["description"]}"' for t in traits) if traits else "None"

    return f"""
{stat_context}

You are a gladiator generator for a cyberpunk arena game set in a brutal dystopian future. Every gladiator must feel unique and draw from varied inspirations.

Using the following data:
- id: {glad_id}
- truePower: {true_power}
- potential: {potential}
- estimatedPower: {estimated_power}
- traits:
{trait_lines}

Inspiration concept: {inspiration}
Suggested tone for descriptor: {tone}
Suggested visual detail for avatarPrompt: {visual}

Name rules:
- First name should sound evocative and slightly mythic, but readable. Avoid generic cyberpunk aliases.
- No reuse of names, avoid “Xyphon”, “Vexor”, “Nyx” and other common generators.
- Draw subtle inspiration from fantasy/sci-fi naming (Red Rising, Dune, First Law), not from gamer handles or bots.

Instructions:
1. Assign each trait as either a publicTrait or hiddenTrait (but not both).
2. Only include the traitName for each trait in the JSON (not the description).
3. Avoid reusing phrases, name roots, or avatarPrompt language seen in other gladiators.
4. Vary tone: poetic, grim, ironic, mythic, or tactical. Avoid repetition.
5. Include specific visual elements (e.g., armor damage, implants, expression, colors).
6. Do not use generic phrases like “sleek armor” or “neon blue visor.”

Output only raw JSON:
{{
  "id": "{glad_id}",
  "name": "...",
  "truePower": {true_power},
  "potential": {potential},
  "estimatedPower": {estimated_power},
  "publicTraits": ["..."],
  "hiddenTraits": ["..."],
  "descriptor": "...",
  "avatarPrompt": "..."
}}
"""

def generate_gladiator():
    glad_id = str(uuid.uuid4())
    true_power, potential, estimated_power = generate_stat_block()
    traits = choose_traits()
    inspiration = random.choice(INSPIRATIONS)
    tone = random.choice(TONES)
    visual = random.choice(VISUAL_MOTIFS)
    prompt = build_prompt(glad_id, true_power, potential, estimated_power, traits, inspiration, tone, visual)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You generate JSON character data for cyberpunk gladiators."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.9
    )

    content = response.choices[0].message.content.strip()
    cleaned = re.sub(r"^```(?:json)?\n|\n```$", "", content.strip())
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        print("\n❌ Failed to parse LLM response as JSON:")
        print(content)
        return None

def generate_batch(n=5):
    return [g for _ in range(n) if (g := generate_gladiator())]

if __name__ == "__main__":
    gladiators = generate_batch(5)
    output_path = os.path.join("..", "assets", "generated_gladiators.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(gladiators, f, indent=2)

    print("✅ Gladiators saved to:", os.path.abspath(output_path))
