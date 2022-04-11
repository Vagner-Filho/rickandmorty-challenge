/// <reference types="Cypress" />

import { ICharacter } from '../../../src/store/types'

const mockCharacter: ICharacter = {
  id: 0,
  name: 'Vagner Dev',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: 'Campo Grande - MS',
  location: 'Campo Grande - MS',
  image: ''
}

const mockedDB = 'http://localhost:5000/character'

const getCharacter = async (id: number) => {
  try {
    const res = await fetch(`${mockedDB}/${id}`)
    if (res.status === 200) {
      const data = await res.json()
  
      const extractCharacter = (data) => {
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
const getSpecie = async (specie: string) => {
  try {
    const res = await fetch(`${mockedDB}/?species=${specie}`)

    if (res.status === 200) {
      const data = await res.json()

      if (data.length === 0) {
        const err: string = "Espécie não encontrada"
        return err
      }

      const extractCharacter = (data) => {
        const character: ICharacter = { ...data }
        return character
      }

      const arr: ICharacter[] = []

      for (const rawCharacter of data) {
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
}
const filterCharacters = async (name?: string, status?: string, species?: string, type?: string, gender?: string) => {
  const options = [name, status, species, type, gender] // Aparentemente, não tenho acesso a arguments aqui em spec.ts
  let params = '';

  if (options[0]) params += `name=${name}&`
  if (options[1]) params += `status=${status}&`
  if (options[2]) params += `species=${species}&`
  if (options[3]) params += `type=${type}&`
  if (options[4]) params += `gender=${gender}&`

  try {
    const rawResponse = await fetch(`${mockedDB}/?${params}`)
    if (rawResponse.status === 200) {
      const data = await rawResponse.json()

      if (data.length > 0) {
        const extractCharacter = (data) => {
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
}

context('Unit Testing', () => {
  describe('Fetching single character', () => {
    it('Successfully fetch a single character', async () => {
      
      assert.notDeepEqual<ICharacter | "Personagem não encontrado!">(await getCharacter(1), mockCharacter, 'Single fetch successful')
    })
    it('Returns message when doesnt find character', async () => {
      assert.strictEqual<ICharacter | "Personagem não encontrado!">(await getCharacter(1000), 'Personagem não encontrado!', 'Returned Ok')
    })
  })
  describe('Fetching species', () => {
    it('All same species', () => {
      const species = ['Human', 'Alien', 'Humanoid', 'unknown', 'Poopybutthole', 'Mythological Creature', 'Animal', 'Robot', 'Cronenberg', 'Disease']

      species.forEach( async (specie: string) => {
        const requestReturn: ICharacter[] | string = await getSpecie(specie)
  
        for (const character of requestReturn) {
          if (typeof(character) == 'object') {
            assert.strictEqual<ICharacter[] | string>(character.species, specie, 'All from same species')
          }
        }
      })
    })
    it('Returns message when doesnt find species', async () => {
      assert.strictEqual<string | ICharacter[]>(await getSpecie('Espécie que nao existe'), 'Espécie não encontrada', 'Message Ok')
    })
  })
  describe('Fetching with filters', () => {
    it('Return match filters', async () => {
      const filters = {
        name: null,
        status: "Alive",
        species: 'unknown',
        type: null,
        gender: null
      }
      const requestReturnArray: ICharacter[] | string = await filterCharacters(filters.name, filters.status, filters.species, filters.type, filters.gender)

      for (const item of requestReturnArray) {
        if (item instanceof Object) {
          if (filters.name) assert.strictEqual<ICharacter[] | string>(item.name, filters.name, 'Name match')
          if (filters.status) assert.strictEqual<ICharacter[] | string>(item.status, filters.status, 'Status match')
          if (filters.species) assert.strictEqual<ICharacter[] | string>(item.species, filters.species, 'Species match')
          if (filters.type) assert.strictEqual<ICharacter[] | string>(item.type, filters.type, 'Type match')
          if (filters.gender) assert.strictEqual<ICharacter[] | string>(item.gender, filters.gender, 'Gender match')
        }
      }
    })
  })
})