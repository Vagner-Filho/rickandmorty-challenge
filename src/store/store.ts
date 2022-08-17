import { ICharacter, ISpeciesCluster } from "./types";
import { defineStore } from "pinia";
import { BASE_URL } from "../../utils/constantes"


const detailedCharacter: ICharacter = {
  id: 0,
  image: "",
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: {
    name: '',
    url: ''
  },
  location: {
    name: '',
    url: ''
  }
}
const filteredCharacters: ICharacter[] = []

const species: ISpeciesCluster = {
  human: {
    cluster: [],
    nextPage: ''
  },
  alien: {
    cluster: [],
    nextPage: ''
  },
  humanoid: {
    cluster: [],
    nextPage: ''
  },
  unknown: {
    cluster: [],
    nextPage: ''
  },
  poopybutthole: {
    cluster: [],
    nextPage: ''
  },
  mythological: {
    cluster: [],
    nextPage: ''
  },
  animal: {
    cluster: [],
    nextPage: ''
  },
  robot: {
    cluster: [],
    nextPage: ''
  },
  cronenberg: {
    cluster: [],
    nextPage: ''
  },
  disease: {
    cluster: [],
    nextPage: ''
  }
}
export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    return {
      species,
      detailedCharacter,
      filteredCharacters,
      filtersOptions: new Array(),
      message: '',
      nextFilteredPage: ''
    }
  },
  persist: true,
  actions: {

    async getSpecie(specie: string) {
      try {
        const rawResponse = await fetch(`${BASE_URL}/?species=${specie}`)

        if (rawResponse.status === 200) {
          const data = await rawResponse.json()

          if (data.results.length === 0) {
            const err: string = "Espécie não encontrada"
            return err
          }

          const extractCharacter = (data: any) => {
            const character: ICharacter = { ...data }
            return character
          }

          const arr: ICharacter[] = []
          for (const rawCharacter of data.results) {
            arr.push(extractCharacter(rawCharacter))
          }
          return { speciesArray: arr, next: data.info.next }
        } else {
          const err: string = "Espécie não encontrada"
          return err
        }
      } catch (error) {
        console.error(error)
      }
    },
    async filterCharacters(filterQuery: string) {
      try {
        const rawResponse = await fetch(`${BASE_URL}/?${filterQuery}`)
        if (rawResponse.status === 200) {
          const data = await rawResponse.json()

          if (data.results.length > 0) {
            const extractCharacter = (data: any) => {
              const character: ICharacter = { ...data }
              return character
            }
            const arr: ICharacter[] = []

            for (const character of data.results) {
              arr.push(extractCharacter(character))
            }
            this.nextFilteredPage = data.info.next
            return arr
          } else {
            const err: string = "Nenhum personagem encontrado"
            return err
          }
        } else {
          const err: string = "Nenhum personagem encontrado"
          return err
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getCharacter(id: number) {
      try {
        const res = await fetch(`${BASE_URL}/${id}`)
        if (res.status === 200) {
          const data = await res.json()

          const extractCharacter = (data: any) => {
            const character: ICharacter = { ...data }
            return character
          }
          return extractCharacter(data)
        }
        else return "Personagem não encontrado!"
      } catch (error) {
        console.error(error)
      }
    }
  }
})