// interface User {
//     image: string;
//     name: string;
//     username: string;
//   }

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
  filterCategory: string;
  setFilterCategory: (value: string) => void;
}



export interface replies {
  content: string | undefined;
  replyingTo: string | undefined;
  user: User | undefined;
}





export interface CommentReplyStyle {
  item: Comment;
  index: number;
  feedback: ProductRequest;
  setFeedback: (feedback: ProductRequest) => void;
  user: User | undefined;
}



type category = {
  value: string;
  label: string;
};

export type Inputs = {
  title: string;
  description: string;
  category: category;
};


