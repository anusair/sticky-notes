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


export const activeCard = (card) => {
  card.style.zIndex = "999";

  const cards = document.querySelectorAll('.card-note');

  cards.forEach((c) => {
    if (c != card) {
      c.style.zIndex = "998";
    }
  })
}