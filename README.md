# TrackRail

**Train journeys, made clearer.**

TrackRail is an independent Indian train information platform starter project. It is designed around a React website/PWA, a Flask API, and an Android application packaged with Capacitor.

## Current status
- Responsive React frontend with train-number search
- Flask backend with health endpoint
- Railway API adapter placeholder that fails safely until a real provider is configured
- Environment-variable configuration
- Capacitor Android configuration

> Live train status is not enabled yet. It requires an authorized railway data provider, documented API access, and a provider-specific adapter. TrackRail does not fabricate live positions or timings.

## Run locally

### Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
# Copy .env.example to .env and configure values when a provider is selected.
python app.py
```
API: http://127.0.0.1:5000

### Frontend
In another terminal:
```bash
cd frontend
npm install
npm run dev
```
Web: http://localhost:5173

The Vite development server proxies `/api` requests to Flask.

## Android
After the web app is running:
```bash
cd frontend
npm run build
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap sync android
npx cap open android
```
The repository includes Capacitor configuration. Initialize the native Android platform with `npx cap add android` if it has not yet been generated. Android Studio and the Android SDK are required to build APK/AAB files.

## Railway provider integration
1. Select a provider with suitable live-running-status coverage and permitted usage.
2. Review authentication, rate limits, refresh policies, attribution, caching and commercial-use terms.
3. Add credentials to `backend/.env` (never commit secrets).
4. Implement the provider's exact documented contract in `backend/railway_api.py`.
5. Test against known trains and label the source and last-updated time in the UI.

## Production checklist
- Set `FRONTEND_URL` to the deployed frontend origin.
- Store API keys in the hosting provider's secret environment variables.
- Add rate limiting, caching, monitoring, structured logs and tests.
- Review privacy, terms, branding and data-provider requirements.
- Do not imply affiliation with Indian Railways or IRCTC.
