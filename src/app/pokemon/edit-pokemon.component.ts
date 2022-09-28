import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';
  
@Component({
  selector: 'edit-pokemon',
  template: `
    <h2 class="header center">Editer {{ pokemon?.name }}</h2>
        <p class="center">
            <img *ngIf="pokemon" [src]="pokemon.picture"/>
        </p>
    <pokemon-form [pokemon]="pokemon"></pokemon-form>
  `,
})
export class EditPokemonComponent implements OnInit {
  
  pokemon!: Pokemon ;
  
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) {}
  
  ngOnInit(): void {
    
    let id = +this.route.snapshot.paramMap.get('id')!;
        
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon );
  }
  
}