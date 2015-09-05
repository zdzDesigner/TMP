'use strict'
/**
 * 研究 Backbone 中模型中的属性和方法
 * @ validate   对数据进行验证 ，通过 on('invalid') 订阅 ，改变属性时通过 {validate: true} 发布 +？
 * @ 事件 change  或 change:key  订阅 ，改变时 发布
 * @ set({keys:vals,[...]}) 或 unset('key') 或 clear() 清空
 * @type {[type]}
 */
var Backbone = require('backbone');
var InvoiceItemModel = Backbone.Model.extend({
    defaults: {
        names: []
    },
    validate: function(attrs) {
        if (!attrs.name) {
            console.log('I need your name');
            return 'I need your name';
        }
    },
    initialize: function() {
        // console.log('initialize');
        // this.set('date-val',(new Date()).toISOString())

        // 改变 所以属性 触发
        // this.on('change',function () {
        //     console.log('attr change');
        // });

        // 改变 names 触发
        this.on('change:names', function() {
            console.log('attr change:names');
        });

        this.on('invalid', function(model, error) {
            console.log('model : ', model);
            console.log('error : ', error);
        });
    }
});
// console.log(InvoiceItemModel);
// InvoiceItemModel.unset('names', {validate: true});
var invoiceItemModel = new InvoiceItemModel({
    date: '2013-04-24',
    description: 'Wooden Toy House',
    price: 22,
    quantity: 3
});
var invoiceItemModel2 = new InvoiceItemModel({
    date: '2013-04-24',
    description: 'Wooden Toy House',
    price: 22,
    quantity: 3
});

var newModel = invoiceItemModel.clone();

/* 设置属性，key存在update or 新增 */
invoiceItemModel.set('names', ['zdz']);
/* 返回设置后的值 */
invoiceItemModel.set({
    quantity: 5,
    price: 10
});
// console.log('set-return',invoiceItemModel);
/* 
 * @ has 判断是否存在
 * @ unset 删除特定属性 
 */
console.log('has', invoiceItemModel.has('names'));
invoiceItemModel.unset('names', {
    validate: true
});
/* 删除模型上的所有属性 */
invoiceItemModel.clear();

// console.log(invoiceItemModel);
// console.log(invoiceItemModel2);
// console.log(newModel);