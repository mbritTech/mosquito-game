/**
 * @author manuel brito
 */
document.addEventListener("DOMContentLoaded", () => {
  const start = document.getElementById("comenzar");
  const gamespace = document.getElementById("gamespace");
  const TABLE_WIDTH = 760;
  const TABLE_HEIGHT = 560;
  let level = 0;
  let velocity = 50;

  const generateRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const setElement = (element) => {
    element.style.left = `${generateRandom(0, TABLE_WIDTH)}px`;
    element.style.top = `${generateRandom(0, TABLE_HEIGHT)}px`;
  };

  const createBb = () => {
    const divBb = document.createElement("div");
    divBb.id = "bebe";
    gamespace.appendChild(divBb);

    setElement(divBb);
  };

  const handleClickMosquito = () => {
    const mosq = document.getElementById("mosquito");

    const divDeadMosq = document.createElement("div");
    divDeadMosq.className = "deadMosquito";
    divDeadMosq.style.left = `${mosq.offsetLeft}px`;
    divDeadMosq.style.top = `${mosq.offsetTop}px`;
    gamespace.appendChild(divDeadMosq);

    setElement(mosq);

    level++;
    document.getElementById("puntuacion").textContent = level;

    velocity /= level + 2;
  };

  const createMosquito = () => {
    const divMosq = document.createElement("div");
    divMosq.id = "mosquito";
    gamespace.appendChild(divMosq);

    setElement(divMosq);

    divMosq.addEventListener("click", handleClickMosquito);
  };

  const gameOver = () => {
    document.getElementById("GameOver").style.visibility = "visible";
    start.disabled = false;
    gamespace.removeChild(document.getElementById("bebe"));
    gamespace.removeChild(document.getElementById("mosquito"));
  };

  const getDirectionX = (baby, mosquito) => {
    if (baby.offsetLeft > mosquito.offsetLeft) {
      return 1;
    } else if (baby.offsetLeft < mosquito.offsetLeft) {
      return -1;
    }
    return 0;
  };

  const getDirectionY = (baby, mosquito) => {
    if (baby.offsetTop > mosquito.offsetTop) {
      return 1;
    } else if (baby.offsetTop < mosquito.offsetTop) {
      return -1;
    }
    return 0;
  };

  const moveMosquitoToBaby = () => {
    const bb = document.getElementById("bebe");
    const mosquito = document.getElementById("mosquito");

    let directionX = getDirectionX(bb, mosquito);
    let directionY = getDirectionY(bb, mosquito);

    mosquito.style.left = `${mosquito.offsetLeft + directionX}px`;
    mosquito.style.top = `${mosquito.offsetTop + directionY}px`;

    if (directionX === 0 && directionY === 0) {
      gameOver();
      return;
    }

    setTimeout(() => {
      moveMosquitoToBaby();
    }, velocity);
  };

  const reset = () => {
    level = 0;
    velocity = 50;
    document.getElementById("puntuacion").textContent = level;
    document.getElementById("GameOver").style.visibility = "hidden";
    gamespace.innerHTML = "";
  };

  const handleClickStart = function () {
    reset();
    this.disabled = true;
    createBb();
    createMosquito();
    moveMosquitoToBaby();
  };

  start.addEventListener("click", handleClickStart);
});
