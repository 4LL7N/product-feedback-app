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
export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  content: string;
  replyingTo?: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
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

export interface MyContextProps {
  close: boolean;
  setClose: (value: boolean) => void;
  dataInfo: any;
  setDataInfo: (value: any) => void;
}
