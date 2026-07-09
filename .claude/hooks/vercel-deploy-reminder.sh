#!/usr/bin/env bash
# PostToolUse hook: after a git commit, remind Claude to offer a Vercel production deploy.
# This project does NOT auto-deploy on git push — production ships via `vercel --prod`
# from the repo root (see memory/deploy-to-production.md). The reminder only prompts
# Claude to ASK the user; it never deploys anything itself.
#
# Reads the tool-call JSON on stdin and inspects tool_input.command. To avoid firing on
# commands that merely mention "git commit" (e.g. `grep "git commit"`, an echoed payload,
# or `git commit-graph`), it parses the command with Python and matches `git commit` only
# at a real command boundary: start of string, or right after a shell separator
# (; & | newline or an opening paren), and requires a space or end-of-string after
# "commit". Falls back to a looser grep only if Python is unavailable.
in=$(cat)
py=$(command -v python3 || command -v python || true)
if [ -n "$py" ]; then
  printf '%s' "$in" | "$py" -c '
import json, re, sys
try:
    cmd = json.load(sys.stdin).get("tool_input", {}).get("command", "")
except Exception:
    sys.exit(0)
if re.search(r"(^|[;&|(\n])\s*git\s+commit(\s|$)", cmd):
    msg = "A git commit just completed. Standing instruction from the user: after every commit, ask whether they want to deploy to Vercel production now by running vercel --prod from the repo root. Ask now and do not deploy without explicit confirmation."
    sys.stdout.write(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": msg}}))
'
else
  printf '%s' "$in" | grep -Eq 'git commit([[:space:]"]|$)' && printf '%s' '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"A git commit just completed. Standing instruction from the user: after every commit, ask whether they want to deploy to Vercel production now by running vercel --prod from the repo root. Ask now and do not deploy without explicit confirmation."}}'
fi
