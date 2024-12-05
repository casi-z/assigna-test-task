import RootClient from '@/api/providers/RootClient.ts'

export default class ProductClient extends RootClient{
  constructor() {
    super()
  }

  public createProduct(){
    this.get()
  }
}
