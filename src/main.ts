import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const startTime = performance.now(); // Start time measurement


function removeLoader() {
  const loader = document.getElementById('app-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0'; // Fade-out effect (optional)
      setTimeout(() => loader.remove(), 300); // Remove after fade-out
    }, 2000); 
  }
}



bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    const endTime = performance.now(); // End time measurement
    const loadTime = endTime - startTime; // Calculate the difference in milliseconds
    console.log(`App loaded in ${loadTime.toFixed(2)} ms`); // Log the load time with 2 decimal points
    removeLoader(); // Call removeLoader after the app is loaded
  })
  .catch((err) => console.error(err));
