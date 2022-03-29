import "./style.css";
import bunnyAssetUrl from "../assets/bunny.png";
import shipAssetUrl from "../assets/ship.png";
import spritesheetAssetUrl from "../assets/spritesheet.png";
import { onWindowResize } from "./lib/screen";
import { loadImage } from "./lib/asset-loaders";

const GAME_WIDTH = 128;
const GAME_HEIGHT = 180;

const bunny = await loadImage(bunnyAssetUrl);
const ship = await loadImage(shipAssetUrl);
const spritesheet = await loadImage(spritesheetAssetUrl);

const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;

// Create from temporary canvas
const tempCanvas = document.createElement("canvas");
tempCanvas.width = ship.width;
tempCanvas.height = ship.height;
tempCanvas.style.imageRendering = "pixelated";

const tempCtx = tempCanvas.getContext("2d")!;
tempCtx.imageSmoothingEnabled = false;

tempCtx.drawImage(
  spritesheet,
  0,
  1,
  ship.width,
  ship.height,
  0,
  0,
  ship.width,
  ship.height,
);

const shipFromCanvas = await loadImage(tempCanvas.toDataURL());

tempCanvas.width = 3;
tempCanvas.height = 5;
tempCtx.clearRect(0, 0, 3, 5);
tempCtx.drawImage(spritesheet, 0, 91, 3, 5, 0, 0, 3, 5);

const zeroImage = await loadImage(tempCanvas.toDataURL());

const resizeHandler = onWindowResize({
  canvas,
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
});

// Call the handler once to scale to the current window.
resizeHandler();

ctx.drawImage(bunny, canvas.width / 2 - bunny.width / 2, 64.5);
ctx.drawImage(ship, 8.5, 64.5);
ctx.drawImage(shipFromCanvas, 20.5, 64.5);
ctx.drawImage(
  spritesheet,
  0,
  1,
  ship.width,
  ship.height,
  32.5,
  65.5,
  ship.width,
  ship.height,
);

ctx.drawImage(zeroImage, 20.5, 10.5);
