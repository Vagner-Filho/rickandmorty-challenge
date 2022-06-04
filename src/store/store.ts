import { ICharacter, ISpeciesCluster, IHttpResponse } from "./types";
import { defineStore } from "pinia";
import { BASE_URL } from "../../utils/constantes"

// requisito: Usar um state management para guardar os dados localmente;
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
  human: [],
  alien: [],
  humanoid: [],
  unknown: [],
  poopybutthole: [],
  mythological: [],
  animal: [],
  robot: [],
  cronenberg: [],
  disease: []
}

const httpResponseInterface: IHttpResponse = {
  status: 0,
  message: "",
  data: null
}
export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    return {
      species,
      detailedCharacter,
      filteredCharacters,
      httpResponseInterface,
      filtersOptions: new Array(),
      message: '',
      nextFilteredPage: ''
    }
  },
  persist: true,
  actions: {
    // requisito: Criação de um design patterns para o projeto
    // não sei muito bem como criar um design pattern, então utilizei o factory
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
          // valida casos em que o retorno é 200, mas o dado vazio
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
    },
    async getNextPageOfCharacters(nextPage: string) {
      await makeHttpRequest(nextPage)
      if (httpResponseInterface.status === 200) {
        // TODO: extract characters from response and put them in appropriate state
      }
    }
  }
})

const makeHttpRequest = async (query: string) => {
  try {

    const response = await fetch(query)
    handleHttpResponse(response)

  } catch (error) {

    const httpResponse: IHttpResponse = {
      status: 0,
      message: '',
      data: null
    }

    if (error instanceof Error) {
      httpResponse.status = 616
      httpResponse.message = error.message
      httpResponse.data = null
    } else {
      httpResponse.status = 617
      httpResponse.message = 'An unexpected error ocurred, please be in touch.'
      httpResponse.data = null
    }
    handleHttpResponse(httpResponse)
  }
}

const handleHttpResponse = async (response: Response | IHttpResponse) => {
  httpResponseInterface.status = response.status
  if (response instanceof Response) {
    httpResponseInterface.message = response.statusText
    httpResponseInterface.data = await response.json()
  } else {
    httpResponseInterface.message = response.message
    httpResponseInterface.data = response.data
  }
}