#!/bin/bash

# Read hook input from stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Only intercept git commit commands
if [[ "$COMMAND" != *"git commit"* ]]; then
  exit 0
fi

# Run fleet-intelligence tests before allowing commit
cd "$CLAUDE_PROJECT_DIR/fleet-intelligence" || exit 0

if ! npm run test 2>&1; then
  echo "Tests failed. Fix failing tests before committing." >&2
  exit 2
fi

exit 0
