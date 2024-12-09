export interface Product {
  id: number
  name: string
  price: number
  created_at: string
  owner_id: number
}

export interface ProductResponse {
  items: Product[]
  total_items: number
  page: number
  total_pages: number
  limit: number
}
