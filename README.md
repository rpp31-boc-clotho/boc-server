# API Routes for Backend Requests | boc-sever

This service provides data for the front end of our service, below is a list of available routes.

<details>
  <summary>GET /homepage</summary>

 **Get Homepage**
----
  Returns json data for main fields in front end.

* **URL**

  /homepage

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `null`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```JSON
    [
      {
        "_id": "620c2fce3a0411a3d065e474",
        "id": 476669,
        "title": "The King's Man",
        "mediaType": "Movie",
        "recommended": [
            {
                "id": 718032,
                "mediaType": "Movie",
                "title": "Licorice Pizza",
                "rating": 7.105,
                "ratingCount": 263,
                "summary": "The story of Alana Kane and Gary Valentine growing up, running around and going through the treacherous navigation of first love in the San Fernando Valley, 1973.",
                "imgUrl": "https://www.themoviedb.org/t/p/w1280/jD98aUKHQZNAmrk0wQQ9wmNQPnP.jpg"
            }
        ],
        "summary": "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
        "imgUrl": "https://www.themoviedb.org/t/p/w1280/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg",
        "popular": true,
        "__v": 0
      },
      ...
    ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Could not fetch" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>GET /homepage/loggedIn</summary>

 **Get Homepage Logged In**
----
  Returns json data for main fields in front end, personalized for user.

* **URL**

  /homepage/loggedIn

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `none`

* **Data Params**

  userId: Integer

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```JSON
    [
      {
        "_id": "620c2fce3a0411a3d065e474",
        "id": 476669,
        "title": "The King's Man",
        "mediaType": "Movie",
        "recommended": [
            {
                "id": 718032,
                "mediaType": "Movie",
                "title": "Licorice Pizza",
                "rating": 7.105,
                "ratingCount": 263,
                "summary": "The story of Alana Kane and Gary Valentine growing up, running around and going through the treacherous navigation of first love in the San Fernando Valley, 1973.",
                "imgUrl": "https://www.themoviedb.org/t/p/w1280/jD98aUKHQZNAmrk0wQQ9wmNQPnP.jpg"
            }
        ],
        "summary": "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
        "imgUrl": "https://www.themoviedb.org/t/p/w1280/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg",
        "popular": true,
        "__v": 0
      },
      ...
      "Watchlist": [
        {
          ...
        }
      ]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Could not fetch" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage",
      dataType: "json",
      type : "GET",
      data: {
        userId: 000
      },
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>GET /homepage/movie/:id</summary>

 **Get Movie**
----
  Returns json data about a single movie.

* **URL**

  /homepage/movie/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```JSON
    {
        "_id": "620c2fce3a0411a3d065e474",
        "id": 476669,
        "title": "The King's Man",
        "mediaType": "Movie",
        "summary": "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
        "imgUrl": "https://www.themoviedb.org/t/p/w1280/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg",
        "popular": true,
        "__v": 0
    }
      ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>GET /homepage/tv/:id</summary>

 **Get TV Show**
----
  Returns json data about a tv show.

* **URL**

  /homepage/tv/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```JSON
        {
        "_id": "620c2fce3a0411a3d065e474",
        "id": 476669,
        "title": "The King's Man",
        "mediaType": "TV",
        "summary": "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
        "imgUrl": "https://www.themoviedb.org/t/p/w1280/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg",
        "popular": true,
        "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---
<details>
  <summary>GET /homepage/search/:mediaType</summary>

 **Get Media**
----
  Returns json data about searched Media.

* **URL**

  /homepage/search/:mediaType

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `meadiaType=Movie/Tv/Both`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `TBD`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Media Doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>GET /homepage/user</summary>

 **Get User**
----
  Returns json data about a single user.

* **URL**

  /homepage/user

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   None

* **Data Params**

  ```
  {username: 'email'}
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
  ```
  [
    {
        "_id": "620c6c024c1770d574948b43",
        "username": "email@gmail.com",
        "subscriptions": {
            "Apple iTunes": false,
            "Apple TV Plus": false,
            "Amazon Prime Video": false,
            "Disney Plus": false,
            "Google Play Movies": false,
            "HBO Max": false,
            "Hulu": false,
            "Netflix": false,
            "Paramount Plus": false,
            "Peacock": false,
            "YouTube": false
        },
        "watchHistory": [],
        "userId": 1,
        "createdDate": "2022-02-21T17:33:51.036Z"
    }
  ]
  ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/user",
      dataType: "json",
      data: {username: "email"},
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>POST /homepage/user/create</summary>

 **Post User**
----
 Posts User to database, then returns json data about user.

* **URL**

  /homepage/user/create

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

   ```
   {username: 'email'}
   ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "username": "email12345@gmail.com",
      "subscriptions": {
          "Apple iTunes": false,
          "Apple TV Plus": false,
          "Amazon Prime Video": false,
          "Disney Plus": false,
          "Google Play Movies": false,
          "HBO Max": false,
          "Hulu": false,
          "Netflix": false,
          "Paramount Plus": false,
          "Peacock": false,
          "YouTube": false
      },
      "watchHistory": [],
      "_id": "6213cd71ea39e2718ce3a6e5",
      "createdDate": "2022-02-21T17:35:45.159Z",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/create",
      dataType: "json",
      data: {username: 'email'},
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>POST /homepage/user/update</summary>

 **Post User**
----
 Update user subscriptions

* **URL**

  /homepage/user/update

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

    ```
    {
      username: 'email',
      subscriptions: {
        'Apple iTunes': 'boolean string',
        'Apple TV Plus': 'boolean string',
        'Amazon Prime Video': 'boolean string',
        'Disney Plus': 'boolean string',
        'Google Play Movies': 'boolean string',
        'HBO Max': 'boolean string',
        'Hulu': 'boolean string',
        'Netflix': 'boolean string',
        'Paramount Plus': 'boolean string',
        'Peacock': 'boolean string',
        'Youtube': 'boolean string'
      }
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    [
      {
        "_id": "620f13c27139767b49438b7d",
        "username": "email+5@gmail.com",
        "subscriptions": {
            "Apple iTunes": true,
            "Apple TV Plus": false,
            "Amazon Prime Video": true,
            "Disney Plus": false,
            "Google Play Movies": false,
            "HBO Max": false,
            "Hulu": false,
            "Netflix": false,
            "Paramount Plus": false,
            "Peacock": true,
            "Youtube": true
        },
        "watchHistory": [],
        "createdDate": "2022-02-18T03:34:26.666Z",
        "__v": 0
      }
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/create",
      dataType: "json",
      data: {
        username: 'email',
        subscriptions: {
            "Apple iTunes": 'true',
            "Apple TV Plus": 'false',
            "Amazon Prime Video": 'false',
            "Disney Plus": 'false',
            "Google Play Movies": 'false',
            "HBO Max": 'false',
            "Hulu": 'false',
            "Netflix": 'false',
            "Paramount Plus": 'false',
            "Peacock": 'false',
            "Youtube": 'false'
        }
      },
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---

<details>
  <summary>POST /homepage/user/watched</summary>

 **Post User**
----
 Update user with new watched show or movie

* **URL**

  /homepage/user/watched

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

    ```
    {
      username: 'email',
      watchedType: 'movies OR shows',
      watchedId: id integer
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    [
      {
        "_id": "620f13c27139767b49438b7d",
        "username": "email+5@gmail.com",
        "subscriptions": {
            "Apple iTunes": true,
            "Apple TV Plus": false,
            "Amazon Prime Video": true,
            "Disney Plus": false,
            "Google Play Movies": false,
            "HBO Max": false,
            "Hulu": false,
            "Netflix": false,
            "Paramount Plus": false,
            "Peacock": true,
            "Youtube": true
        },
        "watchHistory": {
          shows: [],
          movies: [123]  
        },
        "createdDate": "2022-02-18T03:34:26.666Z",
        "__v": 0
      }
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

  * **Code:** 200 OK <br />
    **Content:** `ID already added to ${watchType} watch list.`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/create",
      dataType: "json",
      data: {
        username: 'email',
        watchedType: 'movies',
        watchedId: 123
      },
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---
