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

def build_prompt(topic: str) -> str:
    """
    Returns a richer, accuracy‑oriented prompt for OpenAI.
    The model is asked to produce raw Markdown *only*.
    """
    return f"""
        You are an expert software architect and systems engineer with a practical, and foundational approach.  
        Write a **concise but information‑dense learning note** on **{topic}** for a mid‑senior software/systems engineer.

        ### Output rules
        - **Format**: *pure Markdown only* – start with `#`, no front‑matter or prose outside the doc itself.
        - **Length**: roughly **350–500 words** (≈2–3 min read).
        - **Voice**: professional, practical, no hype.
        - **Accuracy**: if unsure, say so briefly; never invent facts.  
        - **Sources**: place **at least two authoritative links** in the **References** section (MD list). Use official docs, RFCs, academic papers, or well‑known blogs.

        ### Suggested outline
        # {topic}

        > **few sentence takeaway**

        ## Core idea
        - bullets capturing the fundamental concept and why it matters

        ## Key features
        - bullets highlighting distinct capabilities and use cases
        
        ## Why / When / How
        - why and when to use it
        - common pitfalls and when not to use it

        ## Example / Walk‑through
        ```pseudo
        # concise code / CLI / sequence diagram

        ## Real-world applications
        - some real world modern day examples

        ## (optional) Sources
        - if applicable, include one or two authoritative links

        """

def generate_topic_doc(topic: str) -> str:
    """
    Generates documentation for a given topic using the OpenAI API,
    formatted in a specific markdown structure.
    """

    prompt = build_prompt(topic)

    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # Or another suitable model like "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are an expert software architect and systems engineer generating learning documents in markdown format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2, # Adjust temperature for desired creativity/consistency
            top_p=0.9,
            max_tokens=1000,
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
    print("\n--- Confirmation ---")
    while True:
        confirm = input(f"Proceed with generating {len(topics_to_generate)} topics? (y/n/number): ").strip().lower()
        if confirm == 'y':
            topics_to_process = topics_to_generate
            print(f"Proceeding with all {len(topics_to_process)} topics.")
            break
        elif confirm == 'n':
            print("Generation cancelled by user.")
            exit(0)
        else:
            try:
                num_to_generate = int(confirm)
                if 1 <= num_to_generate <= len(topics_to_generate):
                    topics_to_process = topics_to_generate[:num_to_generate]
                    print(f"Proceeding with the first {len(topics_to_process)} topics.")
                    break
                else:
                    print(f"❌ Error: Please enter a number between 1 and {len(topics_to_generate)}.")
            except ValueError:
                print("❌ Error: Invalid input. Please enter 'y', 'n', or a number.")

    # --- Generation Phase ---
    print("\nStarting generation...")
    generated_count = 0
    skipped_count = existing_files # Start skipped count with pre-checked files
    error_count = 0

    # Process only the topics identified for generation based on user confirmation
    total_to_process = len(topics_to_process)
    for i, topic in enumerate(topics_to_process):
        output_filename = get_safe_filename(topic)
        output_filepath = OUTPUT_DIR / output_filename

        # This check is slightly redundant now but safe to keep
        if output_filepath.exists():
            # Should ideally not happen due to pre-check, but handle defensively
            print(f"  ⚠️ Skipping {topic}: File found unexpectedly at {output_filepath.name}")
            # Adjust counts - this topic wasn't really processed
            # skipped_count += 1 # No need to increment skipped_count again, it was counted in preview
            continue

        print(f"\n[{i+1}/{total_to_process}] Generating: {topic}")
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
        if i < total_to_process - 1: # Don't sleep after the last item
            # print(f"  💤 Sleeping for {API_CALL_DELAY_SECONDS} second(s)...")
            time.sleep(API_CALL_DELAY_SECONDS)

    print("\n--- Generation Summary ---")
    print(f"Successfully generated new files: {generated_count}")
    # Skipped count now includes those identified in preview + any unexpected finds
    # Total skipped = Total topics - Processed (Generated + Error) - Unexpected Skips during loop (though this last part should be 0)
    final_skipped_count = len(topics) - generated_count - error_count
    print(f"Skipped (already existing or not processed): {final_skipped_count}")
    print(f"Errors encountered during generation/saving: {error_count}")
    print("-------------------------")
    print("Documentation generation complete.")
