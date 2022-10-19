export class Player {
  name: string;
  image: HTMLImageElement = new Image();

  constructor(name: string, imageSrc: string) {
    this.name = name;
    this.image.src = imageSrc;
  }
}
