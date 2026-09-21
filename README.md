# Task 1 (Variant): Campus Marketplace API

You are building the backend for a peer-to-peer campus marketplace. Anyone
can browse and manage listings — there's no login for this variant.

Express + MongoDB (Mongoose), one entity that needs full CRUD and request
validation. The wrinkle in this variant is how "delete" actually behaves.

## What's already done for you

- `server/src/index.js`, `server/src/app.js`, `server/src/config/db.js` —
  app bootstrap and DB connection.
- `server/src/models/User.js` — a plain user schema (`name`, `email`,
  `password`). It's not tied to any login flow here; it exists so
  `Listing.seller` has something to reference.
- `server/src/controllers/userController.js` + `server/src/routes/users.js`
  — full CRUD over users, already wired, as a worked example of what your
  `listingController.js` should look like structurally (validation → DB
  call → response, one function per route).

Run `npm install` then `npm run dev` inside `server/` once you've filled in
the TODOs below. There is no `.env` provided — create your own
`server/.env` (it's git-ignored) with the keys below.

## Database connection

Create `server/.env` yourself with:

```
PORT=4000
MONGO_URI=mongodb://tasks:pass1234@ac-j3acrgb-shard-00-00.lueesfz.mongodb.net:27017,ac-j3acrgb-shard-00-01.lueesfz.mongodb.net:27017,ac-j3acrgb-shard-00-02.lueesfz.mongodb.net:27017/?ssl=true&replicaSet=atlas-6to6iy-shard-0&authSource=admin&appName=Cluster0
```

## What you need to build

### 1. The `Listing` model — `server/src/models/Listing.js`

| field | type | rules |
|---|---|---|
| `title` | String | required |
| `description` | String | optional |
| `price` | Number | required, `min: 0` |
| `category` | String | enum: `textbooks`, `electronics`, `furniture`, `clothing`, `other`; default `other` |
| `condition` | String | enum: `new`, `like-new`, `used`, `worn`; default `used` |
| `status` | String | enum: `active`, `sold`, `removed`; default `active` |
| `seller` | ObjectId ref `User` | optional, plain field like any other |

Add `{ timestamps: true }`. No unique index in this variant.

### 2. Validation — inside `server/src/controllers/listingController.js`

Joi (or your choice) schema for create/update. `price` must be a
non-negative number.

### 3. Controller + routes

Implement full CRUD over listings — create, read one, read all, update,
and delete — except the delete one isn't a real delete, see section 4.
Your list endpoint should exclude removed listings by default, with a way
to opt into seeing them. Decide the paths and HTTP methods yourself,
following standard REST conventions.

### 4. Soft delete — the actual point of this variant

`DELETE /api/listings/:id` must **not** remove the document from MongoDB.
It should set `status: 'removed'` instead (your call what to return, be
consistent). Think about why a marketplace app would want this over a hard
delete (dispute resolution, "you bought something that no longer shows up
anywhere," audit trail) — and make sure your `GET` endpoints don't silently
show removed listings by default.

### 5. Stretch goal — mark as sold

Add a way to flip `status` to `'sold'` without going through your generic
PATCH validation rules if you don't want price/category editable once sold
— your call on how strict to make this.

### 6. Stretch goal — populate

Use Mongoose's `.populate('seller')` on `getAllListings`/`getListing` so the
response includes the referenced user's `name`/`email` instead of just an
id. Look up what `.populate()` actually does under the hood (it's a second
query, not a SQL join) before you use it.

You're expected to use AI tools while building this — that's fine and
expected. But you should be able to explain, for any line in your
controller, *why* it's there and what happens if you delete it. We will ask.
