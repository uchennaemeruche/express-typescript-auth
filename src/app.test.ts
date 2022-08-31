function greet({ name }: { name: string }): string {
  return `Hello ${name}`;
}

test('should return greeting', () => {
  const name = 'Uchenna';
  expect(greet({ name })).toContain('Uchenna');
  expect(greet({ name })).toContain(`Hello ${name}`);
});
