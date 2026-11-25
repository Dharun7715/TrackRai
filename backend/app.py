import os
import re

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from railway_api import (
    get_live_status,
    ProviderNotConfigured,
    RailwayProviderError,
)

load_dotenv()

app = Flask(__name__)
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
CORS(app, resources={r"/api/*": {"origins": frontend_url}})


@app.get("/")
def home():
    return jsonify({
        "app": "TrackRail",
        "message": "TrackRail API is running",
        "status": "ok",
    })


@app.get("/api/health")
def health():
    return jsonify({
        "status": "healthy",
        "application": "TrackRail API",
        "version": "0.1.0",
    })


@app.get("/api/trains/<train_number>/live")
def live_train(train_number):
    if not re.fullmatch(r"\d{5}", train_number):
        return jsonify({
            "status": "invalid_request",
            "message": "Enter a valid 5-digit train number.",
        }), 400

    try:
        data = get_live_status(train_number)
        return jsonify({"status": "ok", "data": data})
    except ProviderNotConfigured as exc:
        return jsonify({
            "status": "provider_not_configured",
            "message": str(exc),
            "train_number": train_number,
        }), 503
    except RailwayProviderError as exc:
        return jsonify({
            "status": "provider_integration_pending",
            "message": str(exc),
            "train_number": train_number,
        }), 501


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "false").lower() == "true",
    )
