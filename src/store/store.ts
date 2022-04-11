import { ICharacter } from "./types";
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

export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    return {
      species: {
        humans: new Array(),
        alien: new Array(),
        humanoid: new Array(),
        unknown: new Array(),
        poopybutthole: new Array(),
        mythological: new Array(),
        animal: new Array(),
        robot: new Array(),
        cronenberg: new Array(),
        disease: new Array()
      },
      detailedCharacter,
      filteredCharacters,
      filtersOptions: new Array(),
      message: '',
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
          console.log(data)
          // valida casos em que o retorno é 200, mas o dado vazio
          if (data.results.length > 0) {
            const extractCharacter = (data: any) => {
              const character: ICharacter = { ...data }
              return character
            }
            const arr: ICharacter[] = []

            for (const character of data.results) {
              arr.push(character)
            }
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