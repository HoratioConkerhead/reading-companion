// Export all books data
import * as stitchedUp from './stitchedUp';

// Export each book as a namespace
export { stitchedUp };

// For future books, add additional imports and exports:
// import * as bookName from './bookName';
// export { bookName };

// Default book (can be configured based on user preference or URL)
export const defaultBook = stitchedUp;