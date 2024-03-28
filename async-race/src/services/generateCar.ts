import carBrands from "./carBrands";
import carModels from "./carModels";

export function generateRandomCar(): string {
  const randomBrandIndex = Math.floor(Math.random() * carBrands.length);
  const randomModelIndex = Math.floor(Math.random() * carModels.length);
  const randomCar = `${carBrands[randomBrandIndex]} ${carModels[randomModelIndex]}`;
  return randomCar;
}

export function generateRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
