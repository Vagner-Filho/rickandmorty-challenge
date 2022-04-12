// diferencial: Typescript

export interface ICharacter {
  id: number
  image: string
  name: string
  status: string
  species: string
  type: string,
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
}

export interface ISpeciesCluster {
  human: ICharacter[]
  alien: ICharacter[]
  humanoid: ICharacter[]
  unknown: ICharacter[]
  poopybutthole: ICharacter[]
  mythological: ICharacter[]
  animal: ICharacter[]
  robot: ICharacter[]
  cronenberg: ICharacter[]
  disease: ICharacter[]
}