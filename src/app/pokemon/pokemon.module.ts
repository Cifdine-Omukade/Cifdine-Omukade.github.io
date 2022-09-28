import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { AuthGuard } from '../auth-guard.service';
import { PokemonSearchComponent } from './search-pokemon.component';
import { FormsModule } from '@angular/forms'; // importe service et directives pour les formulaires
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon.component';


import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { LoaderComponent } from '../loader.component';

import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';


import { PokemonService } from './pokemon.service';



@NgModule({
  declarations: [
    PokemonTypeColorPipe,
    ListPokemonsComponent,
  DetailPokemonComponent,
BorderCardDirective,
PokemonFormComponent,
EditPokemonComponent,
PokemonSearchComponent,
LoaderComponent
],

  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule
  ],
  providers:[PokemonService, AuthGuard] // on fournit le service dans tout le module => dispo dans tout ses composants
})
export class PokemonModule { }
