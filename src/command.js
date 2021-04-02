export function matchesCommand(message, commandName) {
  return message.startsWith(`/${commandName}`);
}

export function stripCommand(message) {
  const index = message.indexOf(' ');
  if (index === -1) return '';
  return message.slice(index + 1);
}
