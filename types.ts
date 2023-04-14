export interface Repo {
  id: string
  name: string
  description: string
  stars: number
}

export interface MemberExtra {
  name: string
  bio: string
  twitter: string
}

export interface Member extends MemberExtra {
  username: string
  avatar: string
  url: string
  htmlUrl: string
}
