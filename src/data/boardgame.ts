export class BoardGame {
  private id: number
  private hidden: boolean
  private name: string
  private producer: string
  private price: number
  private discount: number
  private numberOfCopies: number
  private minNumberOfPlayers: number
  private maxNumberOfPlayers: number
  private photos: string[]
  private tags: string[]
  private stars: number[]

  public constructor(
    id: number,
    hidden: boolean,
    name: string,
    producer: string,
    price: number,
    discount: number,
    numberOfCopies: number,
    minNumberOfPlayers: number,
    maxNumberOfPlayers: number,
    photos: string[],
    tags: string[],
    stars: number[],
  ) {
    this.id = id
    this.hidden = hidden
    this.name = name
    this.producer = producer
    this.price = price
    this.discount = discount
    this.numberOfCopies = numberOfCopies
    this.minNumberOfPlayers = minNumberOfPlayers
    this.maxNumberOfPlayers = maxNumberOfPlayers
    this.photos = photos
    this.tags = tags
    this.stars = stars
  }

  public getID(): number {
    return this.id
  }

  public getHiddenStatus(): boolean {
    return this.hidden
  }
  public setHiddenStatus(newHiddenStatus: boolean) {
    this.hidden = newHiddenStatus
  }

  public getName(): string {
    return this.name
  }
  public setName(newName: string) {
    this.name = newName
  }

  public getProducer(): string {
    return this.producer
  }
  public setProducer(newProducer: string) {
    this.producer = newProducer
  }

  public getPrice(): number {
    return this.price
  }
  public setPrice(newPrice: number) {
    this.price = newPrice
  }

  public getDiscount(): number {
    return this.discount
  }
  public setDiscount(newDiscount: number) {
    this.discount = newDiscount
  }

  public getNumberOfCopies(): number {
    return this.numberOfCopies
  }
  public setNumberOfCopies(newNumberOfCopies: number) {
    this.numberOfCopies = newNumberOfCopies
  }

  public getMinNumberOfPlayers(): number {
    return this.minNumberOfPlayers
  }
  public setMinNumberOfPlayers(newMinNumberOfPlayers: number) {
    this.minNumberOfPlayers = newMinNumberOfPlayers
  }

  public getMaxNumberOfPlayers(): number {
    return this.maxNumberOfPlayers
  }
  public setMaxNumberOfPlayers(newMaxNumberOfPlayers: number) {
    this.maxNumberOfPlayers = newMaxNumberOfPlayers
  }

  public getPhotos(): string[] {
    return this.photos
  }
  public setPhotos(newPhotos: string[]) {
    this.photos = newPhotos
  }

  public getTags(): string[] {
    return this.tags
  }
  public setTags(newTags: string[]) {
    this.tags = newTags
  }

  public getStars(): number[] {
    return this.stars
  }
  public addStar(newStarRating: number) {
    this.stars.push(newStarRating)
  }
}
