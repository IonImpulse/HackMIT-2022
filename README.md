Repo (pronounced ree-poh) for team ***muddkippers*** at HackMIT 2022.

# Idea: ISO (In Search Of)


# API Methods
### `GET` /api/v1/posts/feedPage/{index}
Returns a page of posts from the feed. The index is the page number, starting at 0.
```js
{
    results: [], // Array of posts
    next: 1, // Index of next page or null
}
```

## GET

### `POST` /api/v1/users/userInfo
Accept a user's JSON object as request body and returns the user's information.
```js
{
    uuid: "UUID-V4", // User's UUID
    token: "String", // User's token
    phone_number: "E.164", // User's phone number
    current_location: [0.0, 0.0], // User's current location
    karma: 0, // User's karma
    posts: [], // Array of user's posts UUIDS
    verified: true, // Whether user is verified
}
```

### `GET` /api/v1/posts/single/{uuid}
Find an individual post by UUID
```js
{
    results: {
        
    },
}
```

## POST

### `POST` /api/v1/posts/claim
Requires the following:
```js
{
    user: User, // User object
    post_uuid: "UUID-V4", // UUID of post to claim
}
```