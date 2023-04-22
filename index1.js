import colors from 'colors';
import readlineSync from 'readline-sync';
const rooms = {
    start: {
        name: 'Starting Room',
        description: 'You are standing in a dimly lit room.',
        exits: {
            east: 'corridor',
        },
        items: [],
    },
    corridor: {
        name: 'Corridor',
        description: 'You are standing in a long corridor.',
        exits: {
            west: 'start',
            east: 'room1',
            south: 'room2',
        },
        items: [],
    },
    room1: {
        name: 'Room 1',
        description: 'You are in a small room.',
        exits: {
            west: 'corridor',
        },
        items: ['key'],
    },
    room2: {
        name: 'Room 2',
        description: 'You are in a large room.',
        exits: {
            north: 'corridor',
        },
        items: ['flashlight'],
    },
};
const objects = [
    {
        name: 'key',
        description: 'An old key with a rusty finish.',
        location: 'room1',
    },
    {
        name: 'flashlight',
        description: 'A small flashlight with a weak beam.',
        location: 'room2',
    },
];
let currentRoom = 'start';
let inventory = [];
while (true) {
    const room = rooms[currentRoom];
    console.log(colors.green(room.name));
    console.log(room.description);
    if (room.items.length > 0) {
        console.log('You see the following items:');
        room.items.forEach((item) => console.log(`  ${item}`));
    }
    const command = readlineSync.question('> ');
    if (command === 'quit') {
        console.log(colors.yellow('Thanks for playing!'));
        process.exit(0);
    }
    if (command === 'inventory') {
        console.log('You are carrying:');
        inventory.forEach((item) => console.log(`  ${item}`));
        continue;
    }
    const exit = room.exits[command];
    if (exit) {
        currentRoom = exit;
        continue;
    }
    const item = room.items.find((item) => item === command);
    if (item) {
        console.log(`You pick up the ${item}.`);
        room.items = room.items.filter((i) => i !== item);
        inventory.push(item);
        continue;
    }
    const object = objects.find((object) => object.name === command && object.location === currentRoom);
    if (object) {
        console.log(object.description);
        continue;
    }
    console.log(colors.red('Invalid command. Please try again.'));
}
