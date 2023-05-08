## Local dev steps

#### Backend
* Install deps
  `cd backend && yarn install`

* Start backend
  `yarn strapi develop` 

#### Frontend
* Install deps
  `cd frontend && yarn install`
* Start frontend
  `yarn dev`


### Notes
* Frontend has a bunch unwanted changes like Tailwind support etc.,
  The **only** files to be concerned are `src/comopnents/blocks/*` and `src/pages/*` and `src/layouts/*`

* The home page can be loaded at `localhost:3000/home`
* The backend api request paths are logged on the frontend server console. Use those urls to try and see the response returned from the backend. The auth token is available on the `frontend/.env` file
* 