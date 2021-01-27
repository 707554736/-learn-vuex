// https://www.jb51.net/article/138600.htm
/**
 * js中decorator借鉴了python 依赖于ES5的Object,defineProperty方法
 * Object.defineProperty方法会在一个对象上对应一个新属性，或者修改一个对象的现有属性，并且返回这个对象，默认情况下，使用defineProperty添加的属性值不可变
 */

//  Object.defineProperty(obj, prop, descripor)

/**
 * 对象中存在的属性描述符有两种，数据描述符和存取描述符
 * 数据描述符是一个具有值的属性，该值可能是可写的，也可能是不可写的
 * 存取符是由getter-setter函数对描述的属性
 * 描述符必须是二者之一，不能同时是两者
 */

@testable
class MyTestableClass {

}
/**
 * 装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。
 * 装饰器本质上执行时编译的函数
 */
function testable(target) {
  target.isTestable = true
}
console.log(MyTestableClass.isTestable);

/**
 * 如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。
 */
function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass { }
MyTestableClass.isTestable // true

@testable(false)
class MyClass { }
MyClass.isTestable // false

/**
 * 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。如果一定要装饰函数，可以采用高阶函数的形式直接执行
 * 把函数作为参数传入，这样的函数称为高阶函数
 */
function doSomething(name) {
  console.log(name);
}

function loggingDecorator(wrapped) {
  return function () {
    console.log('Starting');
    const result = wrapped.apply(this, arguments)
    console.log('finished');
    return result
  }
}
