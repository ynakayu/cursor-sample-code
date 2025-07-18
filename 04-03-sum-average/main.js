const arr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const sum = arr.reduce((acc, curr) => {
  return acc + curr;
}, 0);

const average = sum / arr.length;

console.log(`The average of the array is: ${average}`);
console.log(`The sum of the array is: ${sum}`);