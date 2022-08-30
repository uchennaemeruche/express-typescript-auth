// Accepts a name and returns a greeting
export function greet({ name }: { name: string }): string {
  return ` Hello ${name}`;
}

greet({ name: 'uchenna' });
