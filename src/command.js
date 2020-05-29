import { USERNAME } from './constants';

const startsWithCaseInsensetive = (a, b) => a.toLowerCase().startsWith(b.toLowerCase());

export function matchesCommand(message, commandName) {
  return [commandName, `${commandName}@${USERNAME}`].some(s => {
    return startsWithCaseInsensetive(message, `/${s} `);
  });
}

export function stripCommand(message) {
  return message.slice(message.indexOf(' ') + 1);
}
