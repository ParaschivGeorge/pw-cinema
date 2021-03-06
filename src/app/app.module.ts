import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MoviesComponent } from './movies/movies.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MovieComponent } from './movies/movie/movie.component';
import { SafeUrlPipe } from './utils/safe-url.pipe';
import { MovieBsComponent } from './movies/movie-bs/movie-bs.component';
import { ReviewBsComponent } from './movies/movie/review-bs/review-bs.component';
import { UserComponent } from './users/user/user.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { HomePageComponent } from './home-page/home-page.component';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    UsersComponent,
    ErrorPageComponent,
    MovieComponent,
    SafeUrlPipe,
    MovieBsComponent,
    ReviewBsComponent,
    UserComponent,
    HomePageComponent
  ],
  entryComponents: [
    MovieBsComponent,
    ReviewBsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ChartsModule,
    WavesModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
