export function shortenLink(link: string, maxLength: number = 50): string {
    if (link.length <= maxLength) {
      return link; // Return as is if it's within the limit
    }
  
    return link.slice(0, maxLength).trim() + "..."; // Truncate and add ellipsis
  }