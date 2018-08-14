let a: string = "test";
console.log(a);

function testLength(a: string, b: number): boolean {
  return a.length === b;
}

let b = testLength("test", 4);
console.log(b);

function vanilla(a: string, b: string) {
  return a + b;
}

type Mammal = {
  legs: number;
  tail: boolean;
  endangered: boolean;
};

let tiger: Mammal = {
  legs: 4,
  tail: true,
  endangered: true
};

enum aClass {
  "Reptile",
  "Mammal"
}

interface Animal {
  type: aClass;
  isAquatic(): boolean;
}

interface MammalInterface {
  legs: number;
  tail: boolean;
  endangered: boolean;
  count(): number;
}

class AnimalClass implements Animal {
  private aquatic: boolean;

  public type: aClass;
  public isAquatic(): boolean {
    return this.aquatic;
  }
}

class MammalClass extends AnimalClass implements MammalInterface {
  private carnivore: boolean;

  public legs: number;
  public tail: boolean;
  public endangered: boolean;

  public count() {
    return 3200;
  }

  public isCarnivore() {
    return this.carnivore;
  }
}

// properties and methods available on a variable is determined from the type;
let panda = new MammalClass();
