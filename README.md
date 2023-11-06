## CoinAlert
My solution to Intuition's technical test.
Created using React, FastAPI, Supabase and [CoinAPI](https://docs.coinapi.io)

#### Implemented functionalities
- An API for Creation / Modification / Deletion of alert definitions
- Multi-Currency support (including BTC)
- User Interface

#### The principle
- The code has a repeating fucntion (FastAPI functionality `repeat_every()`) that executes a verification function every 30 minutes or so.
- The verification makes an API call to CoinAPI and verifies if any of the alert definitions raise any alerts.
- If any alerts are detected, the alerts are stored in a PostgreSQL database (Supabase)
- The API provides routes for the frontend to get / modify /delete the alerts and alert definitions.
- The frontend app loads the alerts upon page refresh or on refresh button click.
- Note: Ideally we should verify for alerst every second, but due to CoinAPI having a 100 per day limit, we have to do API calls more sparingly to capture price fluctuations throughout the day.



#### Usage guide
###### Pre-requisites
- Python 3.9+
- NodeJS v18+

###### Installation
- `backend/`: Run the command `pip install -r requirements.txt` (If it doesn't work try again with `pip3`)
- `frontend/`: Run the command `npm install`

###### Execution
- `backend/`: Run the command `uvicorn main:app --reload`
- `frontend/`: Run the command `npm run dev`

#### Live links 
- [Live frontend](https://coinalert.netlify.app/)
- [API link](https://coinalert.onrender.com)