import { AuthGuard } from './../auth-guard.service';

import { EditPokemonComponent } from './edit-pokemon.component';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  

import { DetailPokemonComponent }  from './detail-pokemon/detail-pokemon.component';
import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';


// les routes du module Pokémon
const pokemonsRoutes: Routes = [
    {path: 'pokemon',
        canActivate: [AuthGuard],
        children: [
            { path: 'all', component: ListPokemonsComponent },
            {path: 'edit/:id', component: EditPokemonComponent},
            { path: ':id', component: DetailPokemonComponent }]}
    
];
  
@NgModule({
    imports: [
        RouterModule.forChild(pokemonsRoutes) // methode forChild dans le module enfant 
    ], 
    exports: [
        RouterModule
    ]
})
export class PokemonRoutingModule { }