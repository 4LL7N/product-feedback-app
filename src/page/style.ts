// interface User {
//     image: string;
//     name: string;
//     username: string;
//   }

//   interface Comment {
//     id: number;
//     content: string;
//     user: User;
//   }

// interface feedback {
//     id: number;
//     title: string;
//     category: string;
//     upvotes: number;
//     status: string;
//     description: string;
//     comments: Comment[];
// }

// export interface dataStyle{
//     currentUser:User,
//     productRequests:feedback[]
// }

interface User {
  image: string;
  name: string;
  username: string;
}

export interface replies{
  content:string,
  replyingTo:string,
  user:User
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?:replies[]
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
  feedback:ProductRequest
}

export interface MyContextProps {
Data:dataStyle|undefined,
setData:(Data:dataStyle) => void
}
