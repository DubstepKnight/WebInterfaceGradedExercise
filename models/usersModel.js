
const users = [
    {
        id: 1,
        username: "admin",
        password: "$2b$10$5HzmutperF3ltqwTfXqj4ulx4Z.lqHtiLT9VHdWEuIpRTW4T91MoO",
        email: "example@mail.com",
        createdAt: "2017-07-21T17:32:28Z",
        lastLogin: "2020-02-24T18:06:04Z",
        postingsId: [
            12,
            56,
            531
        ]
    },
    {
        id: 2,
        username: "ExampleUser1",
        password: "$2b$10$5HzmutperF3ltqwTfXqj4ulx4Z.lqHtiLT9VHdWEuIpRTW4T91MoO",
        email: "example@mail.com",
        createdAt: "2017-07-21T17:32:28Z",
        lastLogin: "2020-02-24T18:06:04Z",
        postingsId: [
            10,
            15,
            50,
            77,
            88
        ]
    },
    {
        id: 3,
        username: "ExampleUser2",
        password: "$2b$10$5HzmutperF3ltqwTfXqj4ulx4Z.lqHtiLT9VHdWEuIpRTW4T91MoO",
        email: "example@mail.com",
        createdAt: "2017-07-21T17:32:28Z",
        lastLogin: "2020-02-24T18:06:04Z",
        postingsId: [
            26,
            53,
            89,
            33
        ]
    }
];

module.exports = {
    // Finding the user by its id
    getUserById: (id) => users.find(user => user.id === id),
    // Finding the user by its username
    getByUsername: (username) => users.find(user => user.username === username),
    // Fetching all users
    getAllUsers: () => users,
    // Adding, registering a new user to the platform
    addNewUser: (user) => {
        users.push(user);
        return user;
    },
    loginUser: (loggingUser) => {
        users.forEach((element, i) => {
            console.log("i", i);
            console.log("element", element);
            if (element.id == loggingUser.id) {
                users[i] = { 
                  id: loggingUser.id,
                  ...loggingUser,
                  lastLogin: new Date()
                }
                console.log('users[i]: ', users[i]);
                result = users[i] ;
            } 
        });
    },
    // Editing the data on user
    changeUser: (user) => {
        console.log("user", user);
        let result = null;
        users.forEach((element, i) => {
            console.log("i", i);
            console.log("element", element);
            if (element.id == user.id) {
                users[i] = { 
                  id: user.id,
                  ...user
                }
                console.log('users[i]: ', users[i]);
                result = users[i] ;
            } 
        });
        return result;
    }
}
