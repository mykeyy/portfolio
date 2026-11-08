// Shared between a writing page and the <Cite> components in its text: the page puts the piece's references here
// before the text renders, so each citation can find its number and its source.
declare namespace App {
  interface Locals {
    references?: {
      id: string;
      author: string;
      title: string;
      year: number | string;
      publisher?: string;
      url?: string;
    }[];
  }
}
