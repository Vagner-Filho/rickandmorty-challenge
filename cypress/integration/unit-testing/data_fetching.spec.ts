/// <reference types="Cypress" />

interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string,
  gender: string
  origin: string
  location: string
}

const mockCharacter: ICharacter = {
  id: 0,
  name: 'Vagner Dev',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: 'Campo Grande - MS',
  location: 'Campo Grande - MS'
}
const mockCharacterArray: ICharacter[] = [
  {
    id: 0,
    name: 'Vagner Dev',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: '',
    origin: 'Campo Grande - MS',
    location: 'Campo Grande - MS'
  }
]

context('Unit Testing', () => {
  describe('Fetching single character', () => {
    it('Successfully fetch a single character', async () => {
      const res: ICharacter = {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        origin: "",
        location: ""
      }
      assert.notDeepEqual<ICharacter>(res, mockCharacter, 'Single fetch successful')
    })
    it('Returns message when doesnt find character', async () => {
      assert.strictEqual('fetched message', 'expected message', 'Returned Ok')
    })
    it('Returns message when query URL is incorrect', async () => {
      assert.strictEqual('request message', 'expected message', 'Returned Ok')
    })
  })
  describe('Fetching species', () => {
    it('All same species', async () => {
      const requestReturn: ICharacter[] = [
        {
          id: 0,
          name: 'Vagner Dev',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: '',
          origin: 'Campo Grande - MS',
          location: 'Campo Grande - MS'
        }
      ]
      for (const character in requestReturn) {
        assert.strictEqual<string>(requestReturn[character].species.toUpperCase(), '', 'All from same species')
      }
    })
    it('Returns message when doesnt find species', async () => {
      assert.strictEqual('request response', 'expected response', 'Message Ok')
    })
  })
  describe('Fetching with filters', () => {
    it('Return matches filters', async () => {
      const filters = {
        name: null,
        status: null,
        species: null,
        type: null,
        gender: null
      } // TODO: build query from filters
      const requestReturnArray: ICharacter[] = [
        {
          id: 0,
          name: 'Vagner Dev',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: '',
          origin: 'Campo Grande - MS',
          location: 'Campo Grande - MS'
        }
      ]
      for (const item of requestReturnArray) {
        if (filters.name) assert.strictEqual<string>(item.name, filters.name, 'Name match')
        if (filters.status) assert.strictEqual<string>(item.status, filters.status, 'Status match')
        if (filters.species) assert.strictEqual<string>(item.species, filters.species, 'Species match')
        if (filters.type) assert.strictEqual<string>(item.type, filters.type, 'Type match')
        if (filters.gender) assert.strictEqual<string>(item.gender, filters.gender, 'Gender match')
      }
    })
  })
})