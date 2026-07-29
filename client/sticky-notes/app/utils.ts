export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const parent = card.parentElement!;

  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  const maxX = parent.clientWidth - card.offsetWidth;
  const maxY = parent.clientHeight - card.offsetHeight;

  return {
    x: Math.max(0, Math.min(offsetLeft, maxX)),
    y: Math.max(0, Math.min(offsetTop, maxY)),
  };
};

let highestZ = 1;
export const activeCard = (card) => {
  highestZ++;
  card.style.zIndex = highestZ;
};

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};
