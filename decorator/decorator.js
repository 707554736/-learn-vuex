/**
 * js中decorator借鉴了python 依赖于ES5的Object,defineProperty方法
 * Object.defineProperty方法会在一个对象上对应一个新属性，或者修改一个对象的现有属性，并且返回这个对象，默认情况下，使用defineProperty添加的属性值不可变
 */

//  Object.defineProperty(obj, prop, descripor)

/**
 * 对象中存在的属性描述符有两种，数据描述符和存取描述符
 * 数据描述符是一个具有值的属性，该值可能是可写的，也可能是不可写的
 * 存取符是由getter-setter函数对描述的属性
 */