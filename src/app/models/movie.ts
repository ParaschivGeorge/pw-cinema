export interface Movie {
    id: number;
    releaseDate: string; // date
    title: string;
    description: string;
    photoUrl: string;
    type: string; // ENUM action, adventure, animation, comedy, drama, fantasy, historical, horror, mystery, philosophical, romance, science fiction, thriller
}
