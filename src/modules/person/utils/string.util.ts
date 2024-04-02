export function onlyNumbers(input: string): string {
  const output = input.replaceAll(/[^0-9]+/g, "")
  console.log(output)
  return output
}
