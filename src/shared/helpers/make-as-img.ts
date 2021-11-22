export function makeAsImg(photoUrl: string): string {
	return photoUrl?.replace('?dl=0', '?raw=1');
}