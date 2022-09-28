import { PokemonService } from './../pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.css'],
 
})
export class ListPokemonsComponent implements OnInit {

  constructor(private router: Router , private pokemonService : PokemonService, private pageTitle: Title){}
  

  pokemons!: Pokemon[]  ;
  
  title: string = "Pokémons !!! ";
  
  
 /* typage fort du parametre e du coup on doit typer fort e.target avec <HtmlInput element
 si on type e:any alors e.target.value suffit 
 
  onKey(e: KeyboardEvent){
    this.value = "Bonjour " + (<HTMLInputElement>e.target).value ;
  }
  */
  ngOnInit(){
    
    this.getPokemons()
    this.pageTitle.setTitle('Pokemons')
  }
  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe( pokemons => this.pokemons = pokemons);
  }

  selectedPokemon(pokemon : Pokemon){
    alert('Tu as selectionné ' + pokemon.name )
    let link = ['/pokemon', pokemon.id]
    this.router.navigate(link);
  }
}

