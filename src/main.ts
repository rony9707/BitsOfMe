import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

function removeLoader() {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.style.opacity = '0'; // Fade-out effect (optional)
    setTimeout(() => loader.remove(), 300); // Remove after fade-out
  }
}

bootstrapApplication(AppComponent, appConfig)
.then(() => removeLoader())
  .catch((err) => console.error(err));
