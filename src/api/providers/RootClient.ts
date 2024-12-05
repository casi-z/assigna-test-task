import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

interface RequestOptions {
  auth?: boolean
  axiosConfig?: AxiosRequestConfig
}

type RequestMethod = 'post' | 'get' | 'put' | 'delete'
export default class RootClient {
  private serverURL = 'http://example.com'

  //Функция для работы магических методов
  private createURL(): string | null {
    const fakeError = new Error()

    if (fakeError.stack) {
      //Получаем строку с именем магического метода из стэка ошибки
      const callerString = fakeError.stack.split('\n')[4]
      //Получаем имя вызывающего магический метод класса и метода
      const callerName = callerString.split(' ')[5].split('.')

      //Убираем из имени класса RootClient
      //Client это класс который наследуется от RootClient и отправляет и получает сообщения через websocket
      //Используя магические методы on и send
      const className = callerName[0].replace('Client', '').toLowerCase()

      const methodName = callerName[1]

      //Переводим название метода в url
      const kebabCaseMethodName = methodName.replace(/[A-Z]/g, (match) => `/${match.toLowerCase()}`)

      return `${this.serverURL}/${className}/${kebabCaseMethodName}`
    } else {
      return null
    }
  }

  private request<T>(method: RequestMethod, body: T | null, options?: RequestOptions) {
    const url = this.createURL()
    if (url) {
      if (method === 'get') {
        return axios.get(url, options?.axiosConfig)
      } else if (typeof axios['method'] === 'function') {
        axios['method'](url, body, options?.axiosConfig)
      }
    }
  }

  protected get(options?: RequestOptions) {
    return this.request('get', null, options)
  }
  protected post<T>(body: T, options?: RequestOptions) {
    return this.reque<T>st('post', body, options)
  }
  protected put<T>(body: T, options?: RequestOptions) {
    return this.requ<T>est('put', body, options)
  }
  protected delete<T>(body: T, options?: RequestOptions) {
    return this.request<T>('delete', body, options)
  }
}
