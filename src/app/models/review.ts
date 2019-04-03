import { User } from './user';
import { Movie } from './movie';

export interface Review {
    _id: number;
    user: any; // number | User
    movie: any; // number | Movie;
    rating: number;
    comment: string;
}
