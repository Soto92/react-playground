export async function withMinDelay(promise, ms) {
  const sleep = new Promise((resolve) => setTimeout(resolve, ms));
  const [result] = await Promise.all([promise, sleep]);
  return result;
}
