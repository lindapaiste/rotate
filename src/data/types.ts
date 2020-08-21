export interface Schema {
    src: string;
    width: number;
    height: number;
    artist: string;
    title: string;
    license: string;
    credit: string;
    year: {
        text: string;
        number: number;
    };
}

export interface Fetched {
    url: string;
    data: Schema;
}
