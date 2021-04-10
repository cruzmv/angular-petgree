export interface Cats{
    uid: string;
    name: string;
    pedgree: string;
    microship?: string;
    date_birth?: firebase.default.firestore.Timestamp;
    date_arrivel?: firebase.default.firestore.Timestamp;
    color?: string;
    part_color?: string;
    patter?: string;
    race?: string;
    sex?: string;
    obs?: string;
    eyes?: string;
    cattery?: string;
    marks?: string;
    father?: Parent;
    mother?: Parent;
    country?: string;
    breeder?: string;
    proprietary?: string;
    creator?: string;
    imageUrl?: string;
}

export interface Parent{
    name?: string;
    race: string;
}

export interface CatPropertie{
    uid: string;
    name: string;
    code: string;
}