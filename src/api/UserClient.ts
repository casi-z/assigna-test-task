import RootClient from '@/api/providers/RootClient.ts'

export default class UserClient extends RootClient{
  constructor() {
    super()
  }
  public login(){
    this.get()
  }
}
