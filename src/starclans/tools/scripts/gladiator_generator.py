from openai import OpenAI
import uuid
import random
import json
import os
import re
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- Unified Trait Pool ---
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

# --- Stat + Trait Generators ---
def generate_stat_block():
    true_power = random.randint(5, 20)
    potential = int(true_power * random.uniform(1.1, 2.5))
    estimated_power = int(true_power * random.uniform(0.6, 1.4))
    return true_power, potential, estimated_power

def choose_traits():
    return random.sample(ALL_TRAITS, k=random.choice([0, 1, 2]))

# --- Prompt Builder ---
def build_prompt(glad_id, true_power, potential, estimated_power, traits):
    stat_context = """
Stat Ranges:
- truePower: 5–20
- potential: 10%–150% above truePower
- estimatedPower: ±10–40% of truePower
"""

    trait_lines = "\n".join(
        f'- "{t["traitName"]} — {t["description"]}"' for t in traits
    ) if traits else "None"

    prompt = f"""
{stat_context}

You are a gladiator generator for a cyberpunk arena game.

Using the following data:
- id: {glad_id}
- truePower: {true_power}
- potential: {potential}
- estimatedPower: {estimated_power}
- traits:
{trait_lines}

Instructions:
1. Assign each trait as either a publicTrait or hiddenTrait (but not both).
2. Only include the traitName for each trait in the JSON (not the description).
3. If no traits are provided, both arrays should be empty.

Generate:
- A unique name for this gladiator (drawing inspiration from sources like Red Rising, Unreal Tournament, and other cyberpunk literature).
- A short descriptor that hints at the gladiator’s stats (truePower, potential, and all traits) without explicitly mentioning them. Keep in mind the possible stat ranges.
- A visual prompt (avatarPrompt) describing unique visualfeatures of the gladiator

Output only raw JSON. Do not include code block formatting or markdown:
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
    return prompt

# --- GPT Call ---
def generate_gladiator():
    glad_id = str(uuid.uuid4())
    true_power, potential, estimated_power = generate_stat_block()
    traits = choose_traits()
    prompt = build_prompt(glad_id, true_power, potential, estimated_power, traits)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You generate JSON character data for cyberpunk gladiators."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    content = response.choices[0].message.content.strip()
    cleaned = re.sub(r"^```(?:json)?\n|\n```$", "", content.strip())
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        print("\n❌ Failed to parse LLM response as JSON:")
        print(content)
        return None

# --- Batch Runner ---
def generate_batch(n=5):
    return [generate_gladiator() for _ in range(n)]

# --- Main Entry Point ---
if __name__ == "__main__":
    gladiators = generate_batch(25)

    output_path = os.path.join("..", "assets", "generated_gladiators.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(gladiators, f, indent=2)

    print("✅ Gladiators saved to:", os.path.abspath(output_path))
