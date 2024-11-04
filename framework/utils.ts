
let nextId = 0;

export function getUid(): number {
  return nextId++;
}
