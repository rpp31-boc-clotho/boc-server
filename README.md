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
  <summary>GET /homepage/search</summary>

 **Get Media**
----
  Returns json data about searched Media.

* **URL**

  /homepage/search
* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `mediaType=movie/tv, `
   `media={mediaName}`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
     ```JSON
    [
      {
        id: 634649,
        mediaType: 'movie',
        title: 'Spider-Man: No Way Home',
        rating: 8.3,
        ratingCount: 8220,
        summary: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        release_date: '2021-12-15',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
      },
      {
        id: 557,
        mediaType: 'movie',
        title: 'Spider-Man',
        rating: 7.2,
        ratingCount: 15265,
        summary: "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.",
        release_date: '2002-05-01',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg'
      },
      {
        id: 315635,
        mediaType: 'movie',
        title: 'Spider-Man: Homecoming',
        rating: 7.4,
        ratingCount: 18086,
        summary: "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
        release_date: '2017-07-05',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg'
      },
      {
        id: 559,
        mediaType: 'movie',
        title: 'Spider-Man 3',
        rating: 6.3,
        ratingCount: 11275,
        summary: "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
        release_date: '2007-05-01',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg'
      },
      {
        id: 1930,
        mediaType: 'movie',
        title: 'The Amazing Spider-Man',
        rating: 6.7,
        ratingCount: 14494,
        summary: "Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision course with Connors' alter ego, The Lizard, Peter will make life-altering choices to use his powers and shape his destiny to become a hero.",
        release_date: '2012-06-23',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg'
      },
      {
        id: 225914,
        mediaType: 'movie',
        title: 'Spider-Man',
        rating: 5.5,
        ratingCount: 77,
        summary: "When an extortionist threatens to force a multi-suicide unless a huge ransom is paid, only Peter Parker can stop him with his new powers as Spider-Man.",
        release_date: '1977-09-14',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/nyXfGIkJQgKhugxMVql15URobtt.jpg'
      },
      {
        id: 558,
        mediaType: 'movie',
        title: 'Spider-Man 2',
        rating: 7.2,
        ratingCount: 12259,
        summary: "Peter Parker is going through a major identity crisis. Burned out from being Spider-Man, he decides to shelve his superhero alter ego, which leaves the city suffering in the wake of carnage left by the evil Doc Ock. In the meantime, Parker still can't act on his feelings for Mary Jane Watson, a girl he's loved since childhood. A certain anger begins to brew in his best friend Harry Osborn as well...",
        release_date: '2004-06-25',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/olxpyq9kJAZ2NU1siLshhhXEPR7.jpg'
      },
      {
        id: 102382,
        mediaType: 'movie',
        title: 'The Amazing Spider-Man 2',
        rating: 6.5,
        ratingCount: 10702,
        summary: "For Peter Parker, life is busy. Between taking out the bad guys as Spider-Man and spending time with the person he loves, Gwen Stacy, high school graduation cannot come quickly enough. Peter has not forgotten about the promise he made to Gwen’s father to protect her by staying away, but that is a promise he cannot keep. Things will change for Peter when a new villain, Electro, emerges, an old friend, Harry Osborn, returns, and Peter uncovers new clues about his past.',
        release_date: '2014-04-16",
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/c3e9e18SSlvFd1cQaGmUj5tqL5P.jpg'
      },
      {
        id: 429617,
        mediaType: 'movie',
        title: 'Spider-Man: Far From Home',
        rating: 7.5,
        ratingCount: 12084,
        summary: "Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.",
        release_date: '2019-06-28',
        imgUrl: 'https://www.themoviedb.org/t/p/w1280/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg'
      }
    ]
    ```
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Media Doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    axios.get('/homepage/search?mediaType=movie&media=jurassic')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
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
      "watchHistory": {
        shows: [],
        movies: [123]
      },
      "watchList": {
        shows: [],
        movies: [123]
      },
      "_id": "6213cd71ea39e2718ce3a6e5",
      "createdDate": "2022-02-21T17:35:45.159Z",
      "__v": 0
    }
    ```

  * **Code:** 200 <br />
    **Content:**
    ```
    {
    "status": "User Already Exists",
    "userProfile": {
        "_id": "6213dbec1052d1acdcc7fbf2",
        "username": "email12345@gmail.com",
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
        "watchList": {
          shows: [],
          movies: [123]
        },
        "createdDate": "2022-02-21T18:37:32.168Z",
        "__v": 0
      }
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
      "watchList": {
        shows: [],
        movies: [123]
      },
      "createdDate": "2022-02-18T03:34:26.666Z",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/update",
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
      "watchList": {
        shows: [],
        movies: [123]
      },
      "createdDate": "2022-02-18T03:34:26.666Z",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

  * **Code:** 200 OK <br />
    **Content:** `ID already added to ${watchType} watch list.`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/watched",
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

<details>
  <summary>POST /homepage/user/watchlist</summary>

 **Post User**
----
 Update user with desired show or movie to watch later

* **URL**

  /homepage/user/watchlist

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

    ```
    {
      username: 'email',
      watchType: 'movies OR shows',
      watchId: id integer
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
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
      "watchList": {
        shows: [],
        movies: [123]
      },
      "createdDate": "2022-02-18T03:34:26.666Z",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

  * **Code:** 200 OK <br />
    **Content:** `ID already added to ${watchType} watch list.`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/user/watchlist",
      dataType: "json",
      data: {
        username: 'email',
        watchType: 'movies',
        watchId: 123
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
  <summary>POST /homepage/review/create</summary>

 **Post User**
----
 Post a new review about a movie or show

* **URL**

  /homepage/review/create

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

   None

* **Data Params**

    ```
    {
      username: 'email',
      contentType: 'movies OR shows',
      contentId: id integer,
      recommend: boolean,
      reviewContent: 'string'
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    {
      "contentId": 999999999,
      "contentType": "shows",
      "username": "test@gmail.com",
      "recommend": true,
      "reviewContent": "This movie rocked!",
      "reported": false,
      "_id": "6218699b61eab23c59cbd61b",
      "date": "2022-02-25T05:31:07.051Z",
      "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Data Improperly Formatted`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/homepage/review/create",
      dataType: "json",
      data: {
        username: 'test@gmail.com',
        contentType: 'shows',
        contentId: 999999999,
        recommend: true,
        reviewContent: 'This movie rocked!'
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
  <summary>Get /homepage/review</summary>

 **Post User**
----
 Get reviews for a movie or show

* **URL**

  /homepage/review

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   None

* **Data Params**

    ```
    {
      contentType: 'movies OR shows',
      contentId: id integer
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```
    [
      {
          "_id": "62187a2bac61510ce869810e",
          "contentId": 999999999,
          "contentType": "movies",
          "username": "chris.lazzarini+5@gmail.com",
          "recommend": true,
          "reviewContent": "This movie rocked!",
          "reported": false,
          "createdDate": "2022-02-25T06:41:47.709Z",
          "__v": 0
      },
      {
          "_id": "62187a45a8119f609ba572c7",
          "contentId": 999999999,
          "contentType": "movies",
          "username": "chris.lazzarini+5@gmail.com",
          "recommend": true,
          "reviewContent": "This movie rocked!",
          "reported": false,
          "createdDate": "2022-02-25T06:42:13.785Z",
          "__v": 0
      },
      {
          "_id": "62187ac4a94e18007647e797",
          "contentId": 999999999,
          "contentType": "movies",
          "username": "chris.lazzarini+5@gmail.com",
          "recommend": true,
          "reviewContent": "This movie rocked!",
          "reported": false,
          "createdDate": "2022-02-25T06:44:20.378Z",
          "__v": 0
      },
      {
          "_id": "62187acdd66d514c05d8d957",
          "contentId": 999999999,
          "contentType": "movies",
          "username": "chris.lazzarini+5@gmail.com",
          "recommend": true,
          "reviewContent": "This movie rocked!",
          "reported": false,
          "createdDate": "2022-02-25T06:44:29.455Z",
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
      url: "/homepage/review",
      dataType: "json",
      data: {
        contentType: 'shows',
        contentId: 999999999
      },
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
</details>

---
