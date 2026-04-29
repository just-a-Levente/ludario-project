export function parseBoardgameForm(raw: any): { data: any; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const price = parseFloat(raw.price)
  const numberOfCopies = parseInt(raw.numberOfCopies)
  const minNumberOfPlayers = parseInt(raw.minNumberOfPlayers)
  const maxNumberOfPlayers = parseInt(raw.maxNumberOfPlayers)
  const tags = Array.isArray(raw.tags)
    ? raw.tags
    : raw.tags
        .split(';')
        .map((t: string) => t.trim())
        .filter(Boolean)

  if (!raw.name?.trim()) errors.name = 'Name is required'
  if (!raw.producer?.trim()) errors.producer = 'Producer is required'
  if (!raw.description?.trim()) errors.description = 'Description is required'
  if (isNaN(price) || price <= 0) errors.price = 'Price must be a positive number'
  if (isNaN(numberOfCopies) || numberOfCopies < 0)
    errors.numberOfCopies = 'Must be a non-negative integer'
  if (isNaN(minNumberOfPlayers) || minNumberOfPlayers < 1)
    errors.minNumberOfPlayers = 'Must be at least 1'
  if (isNaN(maxNumberOfPlayers) || maxNumberOfPlayers < 1)
    errors.maxNumberOfPlayers = 'Must be at least 1'
  if (maxNumberOfPlayers < minNumberOfPlayers)
    errors.playerCount = 'Max players must be greater than or equal to min players'
  if (tags.length === 0) errors.tags = 'At least one tag is required'
  if (!raw.thumbnailURL?.trim()) errors.name = 'URL is required'

  return {
    data: {
      ...raw,
      price,
      numberOfCopies,
      minNumberOfPlayers,
      maxNumberOfPlayers,
      tags,
    },
    errors,
  }
}
