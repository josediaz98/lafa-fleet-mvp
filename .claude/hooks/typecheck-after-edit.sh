#!/bin/bash

# PostToolUse hook: run TypeScript typecheck after editing .ts/.tsx files in fleet-intelligence/
# Informational only — reports errors but does not block (exit 0 always)

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // ""')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // ""')

# Only trigger on Write or Edit tools
if [[ "$TOOL" != "Write" && "$TOOL" != "Edit" ]]; then
  exit 0
fi

# Only trigger for .ts/.tsx files inside fleet-intelligence/
if [[ "$FILE_PATH" != *"fleet-intelligence/"* ]]; then
  exit 0
fi

if [[ "$FILE_PATH" != *.ts && "$FILE_PATH" != *.tsx ]]; then
  exit 0
fi

# Run typecheck
cd "$CLAUDE_PROJECT_DIR/fleet-intelligence" || exit 0

OUTPUT=$(npx tsc --noEmit 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "TypeScript errors found after editing $FILE_PATH:" >&2
  echo "$OUTPUT" >&2
fi

# Always exit 0 — informational only, never blocks
exit 0
