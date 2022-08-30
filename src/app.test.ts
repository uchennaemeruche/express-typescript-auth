import { greet } from './app';

test('should return greeting', () => {
  const name = 'Uchenna';
  expect(greet({ name })).toContain('Uchenna');
  expect(greet({ name })).toContain(`Hello ${name}`);
});
