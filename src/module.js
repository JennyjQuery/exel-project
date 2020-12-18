console.log('модуль js');
console.log('я работаю')

async function start() {
  return await Promise.resolve('async working!')
}
start().then(console.log);
