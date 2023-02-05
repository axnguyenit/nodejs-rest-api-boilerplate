import app from './app';

try {
  app.listen(8080, (): void => {
    console.info(`Server is running on http://127.0.0.1:8080`);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
