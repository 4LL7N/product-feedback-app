
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
  comments?: Comment[]|any;
}

export interface dataStyle {
  currentUser: User;
  productRequests: ProductRequest[];
}


export interface Reply {
  content: string;
  replyingTo?: string;
  user: User;
}


export interface dataStyle {
  currentUser: User;
  productRequests: ProductRequest[];
}


export interface CommentReplyStyle {
  item: Comment;
  index: number;
  feedback: ProductRequest;
  setFeedback: (feedback: ProductRequest) => void;
  user: User | undefined;
  productRequests:ProductRequest[]|null,
  reply:(replyText:React.RefObject<HTMLTextAreaElement>,comId:number,replyTo:string|undefined,comErr:boolean,setComErr:(comErr:boolean)=> void)=>void
}


export interface MyContextProps {
  close: boolean;
  setClose: (value: boolean) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}



type category = {
  value: string;
  label: string;
};

type status = {
  value: string;
  label: string;
};

export type Inputs = {
  title: string;
  description: string;
  category: category;
  status: status;
};

