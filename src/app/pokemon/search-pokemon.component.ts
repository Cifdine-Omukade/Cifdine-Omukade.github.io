import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
  
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';
   
@Component({
    selector: 'pokemon-search',
    templateUrl: './search-pokemon.component.html'
})
export class PokemonSearchComponent implements OnInit {
   
    private searchTerms = new Subject<string>(); 
    // Subject est une class Rxjs qui herite d'Observable , elle permet de stocker successivement les resultats dans un tableau
    pokemons$!: Observable<Pokemon[]>;
   
    constructor(
        private pokemonService: PokemonService,
        private router: Router) { }
   
    // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
    // next est similaire à push en JS , push ne fonctionne pas car il ne s'agit pas reellement d'un tableau
    search(term: string): void {
        this.searchTerms.next(term); 
        
    }
   
    ngOnInit(): void {
        this.pokemons$ = this.searchTerms.pipe(
            // attendre 300ms de pause entre chaque requête
            debounceTime(300),
            // ignorer la recherche en cours si c'est la même que la précédente
            distinctUntilChanged(),
            // on retourne la liste des résultats correpsondant aux termes de la recherche
            switchMap((term: string) => this.pokemonService.searchPokemon(term)),
        );
    }
   
    gotoDetail(pokemon: Pokemon): void {
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }
}