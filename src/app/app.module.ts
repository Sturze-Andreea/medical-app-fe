import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationModule } from './modules/application/application.module';
import { LoginModule } from './modules/login/login.module';
import { PlatformModule } from './modules/platform/platform.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApplicationModule,
    LoginModule,
    PlatformModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
