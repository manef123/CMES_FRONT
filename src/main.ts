import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter , RouterModule} from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes)]
 });
