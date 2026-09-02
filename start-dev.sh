#!/usr/bin/env bash
# Keep the dev server alive across shell sessions by detaching into its own
# session and disowning. Pings :3000 for up to 30s and reports readiness.
set -e
cd /home/z/my-project

pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
sleep 1

setsid bash -c 'cd /home/z/my-project && exec bun run dev' </dev/null >>/home/z/my-project/dev.log 2>&1 &
disown 2>/dev/null || true
echo "Launched dev server"

for i in $(seq 1 30); do
  if curl -s -o /dev/null --max-time 2 http://localhost:3000/ 2>/dev/null; then
    echo "Dev server responding on :3000 after ${i}s"
    exit 0
  fi
  sleep 1
done
echo "Dev server failed to start within 30s"
exit 1
