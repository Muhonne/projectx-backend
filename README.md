# ProjectX

Idea was/is to make an internal tool for sharing knowledge about projects in a company. At the moment it's a very basic node+express+mongo backend.

## Get started
Use Yarn or npm, instructions with yarn
* Install deps with `Yarn`
* `yarn start` to run
* You should have mongo running locally, set the url in `environment.js`
* Authentication is off at the moment but the functionality is there, if you want to set it on
     * uncomment line 6 in `api.js` - `// router.use(passport.authenticate("jwt", { session: false }));`

## Implementation
There's nothing fancy:
* server setup in `app.js`
* mongoose models in `models/`
* routes in `routes/`
* mongo and authentication setup in `config/`