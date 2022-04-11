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

export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    return {
      species: {
        humans: new Array(),
        alien: [],
        humanoid: [],
        unknown: [],
        poopybutthole: [],
        mythologicalCreature: [],
        animal: [],
        robot: [],
        cronenberg: [],
        disease: []
      },
      detailedCharacter
    }
  },
  persist: true,
  actions: {
    async getSpecie (specie: string) {
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
          return arr
        } else {
          const err: string = "Espécie não encontrada"
          return err
        }
      } catch (error) {
        console.error(error)
      }
    },
    async filterCharacters(name?: string, status?: string, species?: string, type?: string, gender?: string) {
      // TODO: implementar com arguments
      const options = [name, status, species, type, gender] // Aparentemente, não tenho acesso a arguments em spec.ts
      let params = '';

      // condicionais abaixo concatenam a query de filtragem
      if (options[0]) params += `name=${name}&`
      if (options[1]) params += `status=${status}&`
      if (options[2]) params += `species=${species}&`
      if (options[3]) params += `type=${type}&`
      if (options[4]) params += `gender=${gender}&`

      try {
        const rawResponse = await fetch(`${BASE_URL}/?${params}`)
        if (rawResponse.status === 200) {
          const data = await rawResponse.json()

          // valida casos em que o retorno é 200, mas o dado vazio
          if (data.length > 0) {
            const extractCharacter = (data: any) => {
              const character: ICharacter = { ...data }
              return character
            }
            const arr: ICharacter[] = []

            for (const character of data) {
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