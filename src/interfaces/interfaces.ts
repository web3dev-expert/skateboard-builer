export interface SignupUser {
    email:string,
    password:string,
    citta_id:number,
    nome:string,
    cognome:string,
    immagine_profilo:File
}

export interface LoginUser {
    email:string,
    password:string
}