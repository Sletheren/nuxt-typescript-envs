const person = {
  age: 100,
  name: 'John'
}

const pet = {
  age: 2,
  name: 'Bob'
}

const result = {
  ...person,
  pet: { ...pet }
}

export default result