export function formatStarCount(num: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)
}
