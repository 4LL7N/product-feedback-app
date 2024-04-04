
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
  
  interface Comment {
    id: number;
    content: string;
    user: User;
  }
  
  interface ProductRequest {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments: Comment[];
  }
  
 export interface AppState {
    currentUser: User;
    productRequests: ProductRequest[];
  }

export interface MyContextProps {

}