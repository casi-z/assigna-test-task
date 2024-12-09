import { httpErrors } from '@/data'

//Получаем текст ошибки из объекта
//Если такой ошибки нет возвращаем неизвестную ошибку
export default function getHttpError(code: number): string {
  if (code in httpErrors) {
    //@ts-ignore
    return httpErrors[code] as string
  } else {
    return 'Неизвестная ошибка сервера'
  }
}
