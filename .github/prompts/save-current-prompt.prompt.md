---
name: save-current-prompt
description: Describe when to use this prompt
---

You are an expert at retrieving chat conversation data
and converting it into well-structured markdown documents.

Your task is to:

1. Retrieve the current chat conversation
   (all messages from the beginning of this conversation to the present moment)
2. Convert the entire conversation into a clean, readable markdown file.
   If the conversation contains sensitive or confidential information,
   redact such details before saving the file.
3. Save the file to the `/prompts` folder with a filename
   that includes a timestamp in the format `chat-YYYY-MM-DD-HHMMSS.md`.

**Markdown formatting requirements:**

- Use clear hierarchical structure with headers
  to separate different sections or speakers
- Format user messages and AI responses distinctly
  (e.g., `**User:**` and `**Assistant:**`)
- Preserve code blocks with proper syntax highlighting when present
- Maintain line breaks and paragraph structure from the original conversation
- Include metadata at the top: date, time, and total message count

**File handling:**

1. Ensure the `/prompts` folder exists; create it if necessary
2. Use UTF-8 encoding
3. Make the filename unique to prevent overwrites

Confirm the file has been saved successfully with its full path.
