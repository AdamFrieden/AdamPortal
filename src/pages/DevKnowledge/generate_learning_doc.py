import os
import json
from openai import OpenAI
from dotenv import load_dotenv
import time  # Added for delay
import re    # Added for filename sanitization
from pathlib import Path # Added for path manipulation

# Load API key from .env
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- Configuration ---
SCRIPT_DIR = Path(__file__).parent
TOPICS_FILE = SCRIPT_DIR / "knowledge_topics.json"
OUTPUT_DIR = SCRIPT_DIR / "generated_docs"
API_CALL_DELAY_SECONDS = 1 # Delay between API calls

def get_safe_filename(topic: str) -> str:
    """Converts a topic string into a safe filename."""
    # Remove invalid characters
    safe_name = re.sub(r'[\/*?:"<>|]', "", topic)
    # Replace spaces and slashes with underscores
    safe_name = re.sub(r'[ /]+', '_', safe_name)
    # Add .md extension
    return f"{safe_name}.md"

def _build_prompt(topic: str) -> str:
    """Constructs the prompt for the OpenAI API call."""
    return f"""
Generate a concise learning document for the topic: "{topic}".

Use a markdown format like this example, appropriate for the topic:

# [EMOJI] {topic}

✅ **[One-sentence summary of the topic]**

### 🧠 Core idea:
- [Bullet point explaining the fundamental concept]
- [Another key aspect of the core idea]

### 📦 Key features:
- [Feature 1]
- [Feature 2]
- [Feature 3, etc.]

### 🔍 Example:
- [A simple, concrete example illustrating the concept]

### 📊 Comparison:
- Compared to [Related Concept 1]: [Key difference/advantage/disadvantage]
- Compared to [Related Concept 2]: [Key difference/advantage/disadvantage]

### 🚀 Real-world applications:
- [Application 1]
- [Application 2]
- [Application 3, etc.]

Instructions:
1.  Replace the bracketed placeholders `[...]` with relevant information for the topic "{topic}".
2.  Choose a single, relevant emoji for the main title `[EMOJI]`.
3.  Keep the descriptions concise and easy to understand.
4.  Focus on the most important aspects for a quick overview.
5.  Output only the raw markdown text, starting directly with the '#'. Do not include any preamble or explanation.
"""

def generate_topic_doc(topic: str) -> str:
    """
    Generates documentation for a given topic using the OpenAI API,
    formatted in a specific markdown structure.
    """

    prompt = _build_prompt(topic)

    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # Or another suitable model like "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are an expert technical writer generating concise learning documents in a specific markdown format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5 # Adjust temperature for desired creativity/consistency
        )
        content = response.choices[0].message.content.strip()

        # Basic validation: Check if the response looks like the expected format
        if not content.startswith("#"):
             print(f"\n⚠️ Warning: Unexpected response format for '{topic}'. Skipping save.")
             print(f"Response received:\n{content}")
             return f"# ⚠️ Error: Unexpected response format for {topic}" # Return error string

        return content

    except Exception as e:
        print(f"\n❌ An error occurred generating '{topic}': {e}")
        return f"# ❌ Error generating documentation for {topic}"


# --- Main Entry Point ---
if __name__ == "__main__":
    print("Starting documentation generation process...")

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")

    # Load topics
    try:
        with open(TOPICS_FILE, 'r', encoding='utf-8') as f:
            topics = json.load(f)
        print(f"Loaded {len(topics)} topics from {TOPICS_FILE}")
    except FileNotFoundError:
        print(f"❌ Error: Topics file not found at {TOPICS_FILE}")
        exit(1)
    except json.JSONDecodeError:
        print(f"❌ Error: Could not decode JSON from {TOPICS_FILE}")
        exit(1)

    # --- Preview Phase ---
    topics_to_generate = []
    existing_files = 0
    for topic in topics:
        output_filename = get_safe_filename(topic)
        output_filepath = OUTPUT_DIR / output_filename
        if not output_filepath.exists():
            topics_to_generate.append(topic)
        else:
            existing_files += 1

    print("\n--- Preview ---")
    print(f"Total topics found: {len(topics)}")
    print(f"Existing documents: {existing_files}")
    print(f"New documents to generate: {len(topics_to_generate)}")

    if not topics_to_generate:
        print("\n✅ No new documents to generate.")
        exit(0)

    print("\nTopics to be generated:")
    for topic in topics_to_generate:
        print(f"- {topic}")

    # --- Confirmation Phase ---
    confirm = input("\nProceed with generation? (y/n): ").strip().lower()

    if confirm != 'y':
        print("Generation cancelled by user.")
        exit(0)

    # --- Generation Phase ---
    print("\nStarting generation...")
    generated_count = 0
    skipped_count = existing_files # Start skipped count with pre-checked files
    error_count = 0

    # Process only the topics identified for generation
    total_to_generate = len(topics_to_generate)
    for i, topic in enumerate(topics_to_generate):
        output_filename = get_safe_filename(topic)
        output_filepath = OUTPUT_DIR / output_filename

        # This check is slightly redundant now but safe to keep
        if output_filepath.exists():
            # Should ideally not happen due to pre-check, but handle defensively
            print(f"  ⚠️ Skipping {topic}: File found unexpectedly at {output_filepath.name}")
            skipped_count += 1 # Adjust count if somehow file appeared
            continue

        print(f"\n[{i+1}/{total_to_generate}] Generating: {topic}")
        print(f"  ⏳ Contacting API...")
        documentation = generate_topic_doc(topic)

        if documentation.startswith("# ❌ Error") or documentation.startswith("# ⚠️ Error"):
             print(f"  ❌ Failed to generate or save for '{topic}'. Check logs above.")
             error_count += 1
        else:
            try:
                with open(output_filepath, "w", encoding='utf-8') as f:
                    f.write(documentation)
                print(f"  ✅ Saved: {output_filepath.name}")
                generated_count += 1
            except IOError as e:
                print(f"  ❌ Error saving file {output_filepath.name}: {e}")
                error_count += 1

        # Add delay to avoid rate limiting
        if i < total_to_generate - 1: # Don't sleep after the last item
            # print(f"  💤 Sleeping for {API_CALL_DELAY_SECONDS} second(s)...")
            time.sleep(API_CALL_DELAY_SECONDS)

    print("\n--- Generation Summary ---")
    print(f"Successfully generated new files: {generated_count}")
    # Skipped count now includes those identified in preview + any unexpected finds
    print(f"Skipped (already existing): {skipped_count}")
    print(f"Errors encountered: {error_count}")
    print("-------------------------")
    print("Documentation generation complete.")
