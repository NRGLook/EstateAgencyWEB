// Прототипное наследование (функциональный стиль)
function BaseClass(name) {
    this.name = name;

    this.getName = function() {
        return this.name;
    };

    this.setName = function(newName) {
        this.name = newName;
    };

    // Дополнительный геттер
    this.getDescription = function() {
        return "BaseClass description";
    };

    // Дополнительный сеттер
    this.setDescription = function(description) {
        this.description = description;
    };
}

function DerivedClass(name, additionalProperty) {
    BaseClass.call(this, name);

    this.additionalProperty = additionalProperty;

    // Декоратор для функции getName
    const originalGetName = this.getName;
    this.getName = function() {
        return `Decorated ${originalGetName.call(this)}`;
    };

    // Дополнительный геттер
    this.getAdditionalProperty = function() {
        return this.additionalProperty;
    };

    // Дополнительный сеттер
    this.setAdditionalProperty = function(newAdditionalProperty) {
        this.additionalProperty = newAdditionalProperty;
    };
}

// Использование прототипного наследования
DerivedClass.prototype = Object.create(BaseClass.prototype);
DerivedClass.prototype.constructor = DerivedClass;

// Использование классов и extends (ES6)
class BaseClassES6 {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    // Дополнительный геттер
    getDescription() {
        return "BaseClassES6 description";
    }

    // Дополнительный сеттер
    setDescription(description) {
        this.description = description;
    }
}

class DerivedClassES6 extends BaseClassES6 {
    constructor(name, additionalProperty) {
        super(name);
        this.additionalProperty = additionalProperty;
    }

    // Декоратор для функции getName
    getName() {
        return `Decorated ${super.getName()}`;
    }

    // Дополнительный геттер
    getAdditionalProperty() {
        return this.additionalProperty;
    }

    // Дополнительный сеттер
    setAdditionalProperty(newAdditionalProperty) {
        this.additionalProperty = newAdditionalProperty;
    }
}

const instance1 = new DerivedClass("Instance 1", "Additional Property 1");
displayResult("Prototype Inheritance", instance1);

const instance2 = new DerivedClassES6("Instance 2", "Additional Property 2");
displayResult("Class Inheritance", instance2);

function displayResult(title, instance) {
    document.body.innerHTML += `<h2>${title}</h2>`;
    document.body.innerHTML += `<p>Initial Name: ${instance.getName()}</p>`;
    document.body.innerHTML += `<p>Initial Additional Property: ${instance.getAdditionalProperty()}</p>`;
    document.body.innerHTML += `<p>Description: ${instance.getDescription ? instance.getDescription() : "N/A"}</p>`;
}
