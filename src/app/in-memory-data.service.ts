import { InMemoryDbService } from 'angular-in-memory-web-api'; 
import { POKEMONS } from './pokemon/mock-pokemon';
  
export class InMemoryDataService implements InMemoryDbService {
    createDb() { // fonction qui crée une database ainsi que les requetes associées pour communiquer avec celle ci
        let pokemons = POKEMONS;
        return { pokemons };
    }
}