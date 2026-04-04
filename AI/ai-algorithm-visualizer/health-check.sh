#!/bin/bash
# Health check script

echo "🏥 Running Health Checks..."
echo ""

BACKEND_URL="http://localhost:5000/api/health"
AI_URL="http://localhost:8000/health"
FRONTEND_URL="http://localhost:5173"

echo "Checking Backend..."
if curl -s "$BACKEND_URL" > /dev/null 2>&1; then
  echo "✅ Backend: OK"
else
  echo "❌ Backend: FAILED"
fi

echo "Checking AI Service..."
if curl -s "$AI_URL" > /dev/null 2>&1; then
  echo "✅ AI Service: OK"
else
  echo "❌ AI Service: FAILED"
fi

echo "Checking Frontend..."
if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
  echo "✅ Frontend: OK"
else
  echo "❌ Frontend: FAILED"
fi

echo ""
echo "Testing Algorithm Endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "bfs",
    "params": {
      "graph": {"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []},
      "start": "A"
    }
  }')

if echo "$RESPONSE" | grep -q "traversal_order"; then
  echo "✅ Algorithm Execution: OK"
  echo "   Response: $RESPONSE"
else
  echo "❌ Algorithm Execution: FAILED"
  echo "   Response: $RESPONSE"
fi

echo ""
echo "✅ Health check complete!"
