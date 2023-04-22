import readlineSync from 'readline-sync';
import colors from 'colors';

console.log(colors.green('Welcome to the Text Adventure Game!'));

while (true) {
  const command = readlineSync.question('> ');

  if (command === 'quit') {
    console.log(colors.yellow('Thanks for playing!'));
    process.exit(0);
  }

  console.log(colors.red(`Unknown command: ${command}`));
}



  