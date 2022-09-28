import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';


  
@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html',
    styleUrls: ['./detail-pokemon.component.css'],
    
})
export class DetailPokemonComponent implements OnInit {
  
   
    pokemon!: Pokemon ;
  
    constructor(private route: ActivatedRoute, private router: Router, private pokemonService : PokemonService) {}
  
    ngOnInit(): void {
        
        let id = +this.route.snapshot.paramMap.get('id')!;
        
        this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon );

        }
  
    goBack(): void {
        this.router.navigate(['/pokemon/all']);

    }
    goEdit(pokemon:Pokemon): void{
        let link = ['/pokemon/edit/', pokemon.id]
        this.router.navigate(link)
    }
    goDelete(pokemon: Pokemon): void {
        this.pokemonService.deletePokemon(pokemon).subscribe(_=> this.goBack());
        

    }
  
}
