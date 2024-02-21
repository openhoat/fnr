export const toWords = (s: string): RegExpMatchArray | null => {
  const regex =
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]?[a-z\u00DF-\u00F6\u00F8-\u00FF]+|[A-Z\u00C0-\u00D6\u00D8-\u00DE]+(?![a-z\u00DF-\u00F6\u00F8-\u00FF])|\d+/g
  return s.match(regex)
}

export const toCamelCase = (s: string): string => {
  const words = toWords(s)
  if (!words) {
    return ''
  }
  const camelCaseWords: string[] = words.map((word, index) => {
    const lowerCaseWord = word.toLowerCase()
    return index > 0
      ? `${lowerCaseWord.slice(0, 1).toUpperCase()}${lowerCaseWord.slice(1)}`
      : lowerCaseWord
  })
  return camelCaseWords.join('')
}

export const recordToString = (record: object): string =>
  Object.keys(record)
    .sort((key1, key2) => key1.localeCompare(key2))
    .reduce(
      (lines: string[], key: string) => [
        ...lines,
        [key, record[key as keyof typeof record]].join(': '),
      ],
      [],
    )
    .join('\n\t')

export const pickFromDict = <T extends Record<string, unknown>>(
  source: NodeJS.Dict<string>,
  keys: string[],
  keyTransformer = (key: string): string => key,
): T =>
  keys.reduce(
    (acc, name) =>
      name
        ? {
            ...acc,
            [keyTransformer(name)]: source[name],
          }
        : acc,
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {
      // Custom values / env vars
    } as T,
  )
