//Получаем рандомный элемент массива
export default function randomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined // Возвращаем undefined, если массив пуст
  }
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
