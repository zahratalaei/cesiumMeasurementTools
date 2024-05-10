// Function to generate a unique ID based on the Cartesian3 position
export function generateUniqueID(position) {
  if(position){
const positionString = position.toString();
let hash = 0;
for (let i = 0; i < positionString.length; i++) {
  const char = positionString.charCodeAt(i);
  hash = (hash << 5) - hash + char;
  hash = hash & hash; // Convert to 32bit integer
}
return "ID_" + Math.abs(hash).toString(36);}
}

