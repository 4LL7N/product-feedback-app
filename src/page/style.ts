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
  image: string | undefined;
  name: string | undefined;
  username: string | undefined;
}

export interface replies {
  content: string | undefined;
  replyingTo: string | undefined;
  user: User | undefined;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: replies[];
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

export interface CommentReplyStyle {
  item: Comment;
  index: number;
  feedback: ProductRequest;
  setFeedback: (feedback: ProductRequest) => void;
  user: User | undefined;
}

export interface MyContextProps {
  Data: dataStyle | undefined;
  setData: (Data: dataStyle) => void;
}

export type Inputs = {
  example: string;
  exampleRequired: string;
};

// not know exactly defaultValues & FormValues neccessary or not
export type FormValues = {
  Select: number;
  ReactSelect: NestedValue<{ value: string; label: string }>;
};

export const defaultValues: DefaultValues<FormValues> = {
  ReactSelect: { value: "vanilla", label: "Vanilla" },
};
