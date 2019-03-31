const users = [];


// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
        // Validate
        if(!username || !room) {
            return {
                error: 'Username and room are required'
            }
        }

    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();


    // Checkfor existing user
    const existingUser = users.find( (user) => {
        return user.room === room && user.username == username
    });

    if(existingUser) {
        return {
            error: 'El usuario ya existe'
        }
    }

    const user = {id, username, room};

    users.push(user);

    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex(x => x.id == id);
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => {
    return users.find(x => x.id === id);
}

const getUsersInRoom = (room) => {
   return users.filter(x => x.room === room);
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

