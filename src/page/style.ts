export interface User {
  image: string|undefined;
  name: string|undefined;
  username: string|undefined;
}

export interface replies{
  content:string|undefined,
  replyingTo:string|undefined,
  user:User|undefined
}

export interface Comment {
  id: number|undefined;
  content: string|undefined;
  user: User|undefined;
  replies?:replies[]|undefined
}

export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

export interface dataStyle {
  currentUser: User;
  productRequests: ProductRequest[];
}

export interface CommnetReplyStyle{
  item:Comment,
  index:number,
  feedback:ProductRequest,
  setFeedback:(feedback:ProductRequest)=>void
  user:User|undefined,
  productRequests:ProductRequest[]|null
}

export interface MyContextProps {
Data:dataStyle|undefined,
setData:(Data:dataStyle) => void
}
