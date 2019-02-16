# Assignment
Your assignment is to implement a small single-page application (server and
client), which displays sites and their devices.

We would like you to imagine it as part of a bigger application where you need
to use good practices to ease scaling, prevent regressions of bugs and keep a
well formed code base. You should also imagine that the project will be shared
with a number of other developers which need to understand the code to make
changes and additions. Remember that you are doing this to show us what you are
good at, every little detail matters.

We would like you to hold back from using starter kits where everything is
generated for you. It makes it hard for us to know what you've added (with a
reason behind it) and what was added for you.

We would appreciate it if you used git for version control (so that we can use
`git log` to see the development process) but you're not required to do so.

Last but not least, you need to send clear instructions on how the application
is started so that we can view the result.


## Details: server
Please use data.db file that comes within assignment folder as your database.
For the sake of simplicity it was created with sqlite3, so depending on the
language of your choice you will need corresponding library.

Required routes:
  * `GET /users` - returns users list
  * `GET /sites` - returns sites list that belongs to current user
  * `GET /sites/{siteId}/alarmZones` - returns alarm zones list for site
  * `GET /sites/{siteId}/devices` - returns devices list for site

### `GET /users` example response
```
  [
    {
      id: 1,
      username: "Demo user"
    },
    {
      id: 2,
      username: "Demo user 2"
    }
  ]
```

### `GET /sites` example response
```
  [
    {
      id: 1,
      title: "Demo site 1"
    },
    {
      id: 2,
      title: "Demo site 2"
    }
  ]
```

### `GET /sites/{siteId}/alarmZones` example response
```
  [
    {
      id: 1,
      armed: false,
      name: "Demo zone 1"
    },
    {
      id: 2,
      armed: true,
      name: "Demo zone 2"
    }
  ]
```

### `GET /sites/{siteId}/devices` example response
```
  [
    {
      id: 1,
      alarm_zone_id: 1,
      title: "Demo camera 1",
      model: "M2025-LE"
      connected: true,
      storages: [
        {
          id: 1,
          type: "NetworkShare",
          state: "ok"
        },
        {
          id: 2,
          type: "SDCard",
          state: "unavailable"
        }
      ]
    }
  ]
```


## Details: client
Required views:
  * Login page
  * Devices list page

### Login page
For the sake of simplicity of the assignment you do not have to implement login
functionality, instead login page should just fetch data from `/users` route
and render select list with available users. After user is selected - it should
be enough to just press login button to enter the application.

### Devices list page
Devices list page should:
  * Display all the sites available to a specific user
  * Allow interaction with sites to display additional information about the
    devices associated with each site
  * Render table with devices data that belongs to selected site

Devices table example:
```
+-------------+-------+-----------+----------------------+-----------------------+
| Device name | Model | Connected | Storages             | Alarm zone            |
+-------------+-------+-----------+----------------------+-----------------------+
| Demo cam 1  | M1050 | Yes       | Network share: OK    | Demo zone 1: disarmed |
|             |       |           | SD card: Unavailable |                       |
+-------------+-------+-----------+----------------------+-----------------------+
| Demo cam 2  | ...   | ...       | ...                  | ...                   |
+-------------+-------+-----------+----------------------+-----------------------+
```

Note:
  * A site represents a collection of devices.
  * A device can represent a camera, video encoder, storage unit, etc.


## P.S.:

If you have any questions about the assignment please don't hesitate to contact
Gurgen Mirzoev, gurgen.mirzoev@axis.com.

Good luck!

Team AVHS
