import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WorkPageComponent } from './pages/work-page/work-page.component';
import { UploadComponent } from './components/upload/upload.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { PixelInfoComponent } from './components/pixel-info/pixel-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WorkPageComponent,
    UploadComponent,
    ToolbarComponent,
    CanvasComponent,
    TooltipComponent,
    PixelInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
