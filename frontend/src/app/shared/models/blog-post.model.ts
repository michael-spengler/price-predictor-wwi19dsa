import { User } from './user.model';
export interface BlogPost {
    interface?: "blog-post",
    id?: number,
    title: string,
    author: User['username'],
    content: string,
    date?: Date
}
