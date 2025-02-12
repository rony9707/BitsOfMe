import { Pipe, PipeTransform, Inject, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'postsFormatText',
  standalone: true
})
export class PostsFormatTextPipe implements PipeTransform {
  

  private sanitizer = inject(DomSanitizer)

  embedLink(text: string): string {
    if (!text) return ''; // Prevents errors if text is undefined or null

    // Regex to detect YouTube links (capture the video ID)
    const youtubePattern =
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+))/g;

    // Replace YouTube links with embedded iframe
    text = text.replace(youtubePattern, (_, url, videoId) => {
      return `<div class="youtube-embed">
                <iframe width="100%" height="400" 
                        src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0" 
                        frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen>
                </iframe>
              </div>`;
    });


    // Regex to detect general URLs (excluding already embedded YouTube links)
    const urlPattern = /(https?:\/\/(?!www\.youtube\.com\/embed\/)[^\s]+)/g;

    // Convert remaining links to clickable anchors
    text = text.replace(urlPattern, '<a href="$1" class="embedded-link" target="_blank">$1</a>');

    return text;
  }

  transform(formatText: string | null | undefined): SafeHtml {
    if (!formatText) return ''; // Prevent errors

    let formattedText = this.embedLink(formatText);

    // Ensure <br> is only applied outside of HTML tags (like <iframe>)
    formattedText = formattedText.replace(/(?![^<>]*>)[\n\r]/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
