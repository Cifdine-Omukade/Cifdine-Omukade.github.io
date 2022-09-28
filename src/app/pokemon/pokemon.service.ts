import { POKEMONS } from './mock-pokemon';
import { Injectable } from '@angular/core'; // permet d'injecter des dependance dans notre service ( obligatoire)
import { Pokemon } from './pokemon';
import { HttpClient,  HttpHeaders } from '@angular/common/http'; // httpHeaders permet de mofifier l'entete des reponse
import { Observable, of } from 'rxjs'; // rappel, une observable est cancellable cotrairemet a une promise qui une fois lancé s'execute forcing
import { catchError, map, tap } from 'rxjs'; // ne pas oublier d'importer les opérateur

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient){}

  private pokemonsUrl = 'api/pokemons'; // généré automatiquement par InMemoryDbService

  private log(log: string){ // interessant de centraliser les log si plus tard on souhaite les archiver
    console.info(log);
  }
/* <T> sert a typer un type , surtyper la reponse permet de s'adapter au differentes type de reponse des differentes methodes*/ 
  private handleError<T>(operation = 'operation' , result? : T ){
    return (error:any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T); /* l'opérateur 'of' transforme le resultat sous forme d'observable permettant de ne pas bloquer
      le déroulement de l'application en cas d'erreur */
    }

  }

  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_=> this.log('pokemons fetched')), // tap est utile pour le debogage ou pour archiver les logs
       catchError(this.handleError(`getPokemons`, [] )) // catchError intercepte les erreurs.
    );
  }
    
  // Retourne le pokémon avec l'identifiant passé en paramètre ,
  // ( se renseigner lorsque je precise le type de retour (Pokemon) cela souleve une erreur)
  getPokemon(id: number): Observable <Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon with id ${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon ${id}`))
    );
  }

  getPokemonTypes(): string[] {
    return ['Feu','Eau','Plante','Insecte','Poison','Normal','Elektrik','Vol','Fée']
  }
  
  updatePokemon(pokemon : Pokemon) : Observable<Pokemon> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-type': 'application/json'})
  };

    return this.http.put<Pokemon>(this.pokemonsUrl, pokemon , httpOptions).pipe(
      tap(_=> this.log( `pokemon updated ${pokemon.id}`)),
      catchError( this.handleError<Pokemon>(`updatedPokemon `))
    )

  }
  deletePokemon(pokemon : Pokemon): Observable<Pokemon>{
    const url = `${this.pokemonsUrl}/${pokemon.id}`
    const httpOptions = {
      headers : new HttpHeaders({'Content-type': 'application/json'})
  };
    return this.http.delete<Pokemon>(url,httpOptions).pipe(
      tap(_ => this.log('deleted pokemon')),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    )
  }
  searchPokemon(term :string) : Observable<Pokemon[]> {
    if(!term.trim){
      return of ([])
    }
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`pokemon found with term = ${term}`)),
      catchError(this.handleError<Pokemon[]>(`searchPokemon failed`,[]))
    )
  }
}
