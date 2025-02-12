import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postsTimeAgo',
  standalone: true
})
export class PostsTimeAgoPipe implements PipeTransform {

  private readonly monthMap: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };

  transform(postDateString: string): string {
    if (!postDateString) return 'Invalid date';

    // Extract date components from "10th Feb, 2025 at 16:00:09 IST"
    const match = postDateString.match(/(\d+)(st|nd|rd|th)?,?\s?(\w+),?\s?(\d{4}) at (\d{2}):(\d{2}):(\d{2})/);
    if (!match) return 'Invalid date format';

    const [, day, , month, year, hours, minutes, seconds] = match;
    
    // Convert month text to number
    const monthNumber = this.monthMap[month];
    if (monthNumber === undefined) return 'Invalid date format';

    // Create a Date object in IST (UTC+5:30)
    const postDate = new Date(Date.UTC(+year, monthNumber, +day, +hours - 5, +minutes - 30, +seconds));
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays >= 1) {
      return postDateString.replace("at", "") ; // Show original timestamp if older than 24 hours
    } else if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }

}
