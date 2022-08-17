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
  human: {
    cluster: ICharacter[],
    nextPage: string
  }
  alien: {
    cluster: ICharacter[],
    nextPage: string
  }
  humanoid: {
    cluster: ICharacter[],
    nextPage: string
  }
  unknown: {
    cluster: ICharacter[],
    nextPage: string
  }
  poopybutthole: {
    cluster: ICharacter[],
    nextPage: string
  }
  mythological: {
    cluster: ICharacter[],
    nextPage: string
  }
  animal: {
    cluster: ICharacter[],
    nextPage: string
  }
  robot: {
    cluster: ICharacter[],
    nextPage: string
  }
  cronenberg: {
    cluster: ICharacter[],
    nextPage: string
  }
  disease: {
    cluster: ICharacter[],
    nextPage: string
  }
}