import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routes.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PokemonModule } from './pokemon/pokemon.module';
import { HttpClientModule } from '@angular/common/http';
//httpclientmodule  configure l'injection de dependance pour HttpClient et renvoie les reponses en JSON directement.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { Title } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
   
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation : false}),
    //HttpClientInMemoryWebApiModule permet d'intercepter les requetes Http pour les envoyer vers notre API
    PokemonModule, 
    LoginRoutingModule,
     //Attention a l'ordre d'importation des modules des routes certaine routes interceptent tout (**).
    AppRoutingModule,
   
    
    
    
    
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
