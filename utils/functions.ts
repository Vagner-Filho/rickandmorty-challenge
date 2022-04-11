export const getFiltersOptions = async () => {
  // refactor to push directly to state
  const statusArr: any[] = []
  const speciesArray: any[] = []
  const typesArray: any[] = []
  const genderArray: any[] = []

  const getCharactersPage = async (url: RequestInfo) => {
    const res = await (await fetch(url)).json()
    res.results.forEach((r: any) => {
      if (!statusArr.includes(r.status)) statusArr.push(r.status)
      if (!speciesArray.includes(r.species)) speciesArray.push(r.species)
      if (!typesArray.includes(r.type)) typesArray.push(r.type)
      if (!genderArray.includes(r.gender)) genderArray.push(r.gender)
    });
    if (res.info.next) await getCharactersPage(res.info.next)
  }

  await getCharactersPage('https://rickandmortyapi.com/api/character')
  return [statusArr, speciesArray, typesArray, genderArray]
}