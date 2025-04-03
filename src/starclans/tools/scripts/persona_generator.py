import random
import uuid
import json

# Axis A – Identity & Flavor
COLORS = ["Crimson", "Azure", "Obsidian", "Pale", "Violet", "Chrome", "Rusted", "Gold", "Silver", "Emerald"]
EMOTIONS = ["Wrathful", "Serene", "Vindictive", "Detached", "Blissful", "Brooding", "Feral"]
FAMILY = [
    "Poor", "Rich", "Noble", "Political", "Religious",
    "Corporate", "Military", "Scientific", "Criminal", "Cultist",
    "Orphan", "Worker Caste", "Merchant", "Enforcer", "Nomadic",
    "Voidborn", "Refugee", "Royal Proxy", "Underground", "Guilded"
]
PURPOSES = ["Executioner", "Exile", "Protector", "Fanatic", "Corporate Icon", "Prototype", "Retributionist", "Survivor", "Outlaw"]
TECHNOLOGIES = ["Cyberlinked", "Synthskin", "AI-Enhanced", "Cloned", "Soul-Chipped", "Scrap-Rebuilt", "Neural-Enhanced", "Quantum-Linked", "Biological", "Synthetic", "Hybrid"]

# Axis B – Tone / Philosophy
TONES = ["Poetic", "Grim", "Altruistic", "Competitive", "Chaotic", "Lawful", "Fanatical", "Sardonic", "Stoic", "Cynical", "Optimistic", "Skeptical", "Hopeful", "Desperate", "Resigned", "Determined", "Passionate", "Apathetic", "Envious", "Content"]

# Axis C – Combat Role & Behavior
ROLES = ["Sneaky", "Tanky", "Glass Cannon", "Strong", "Wildcard", "Leader", "Juggernaut", "Duelist", "Disabler", "Sniper"]
STYLES = ["Precise", "Reckless", "Reactive", "Opportunistic", "Calculated", "Frenzied", "Tactical", "Aggressive", "Defensive", "Supportive"]
PRESENCES = ["Intimidating", "Elusive", "Commanding", "Eerie", "Chaotic", "Magnetic", "Courageous", "Resolute", "Vengeful"]

# Axis D – Visual / Physiology
FORMS = ["Hulking", "Gaunt", "Alien", "Cloned", "Spined", "Armored", "Slim", "Stocky", "Sinuous"]
SURFACES = ["Burnished", "Rusting", "Fractal-Plated", "Glowing", "Leaking", "Sleek", "Shattered", "Rough", "Gritty"]

def generate_persona_profile():
    return {
        "id": str(uuid.uuid4()),
        "persona": {
            "color": random.choice(COLORS),
            "emotion": random.choice(EMOTIONS),
            "family": random.choice(FAMILY),
            "purpose": random.choice(PURPOSES),
            "technology": random.choice(TECHNOLOGIES),
            "tone": random.choice(TONES),
            "role": random.choice(ROLES),
            "style": random.choice(STYLES),
            "presence": random.choice(PRESENCES),
            "form": random.choice(FORMS),
            "voice": random.choice(VOICES),
            "surface": random.choice(SURFACES),
        }
    }

if __name__ == "__main__":
    profile = generate_persona_profile()
    print(json.dumps(profile, indent=2))
