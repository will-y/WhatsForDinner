import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeSearchComponent,
    WeeklyViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
