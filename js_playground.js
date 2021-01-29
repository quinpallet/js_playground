// 分割代入
let a, b, restOf;

[a, b] = [100, 200];
console.log(a, b);
// 100 200

[a, b, ...restOf] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(a, b);
// 10 20
console.log(restOf);
// [
//     30, 40, 50,  60,
//     70, 80, 90, 100
// ]
const array1 = [1, 2, 3, 4];
const array2 = [...array1, 5, 6, 7, 8, 9, 10];
console.log(array2);
// [
//     1, 2, 3, 4,  5,
//     6, 7, 8, 9, 10
// ]

({ a, b } = { a: 1000, b: 2000 });
console.log(a, b);
// 1000 2000

({ a, b, ...restOf } = { a: 1, b: 2, c: 3, d: 4 });
console.log(a, b);
// 1 2
console.log(restOf);
// { c: 3, d: 4 }

const object1 = { x: 777, y: 'yyy' };
const { x: zorome, y: triple } = object1;
console.log(zorome, triple);
// 777 yyy

const families = [
    {
        id: 1,
        name: 'Taro Yamada',
        age: 45,
        family: {
            wife: 'Hanako Yamada',
            child1: 'Kotaro Yamada',
            child2: 'Yuriko Yamada'
        }
    },
    {
        id: 2,
        name: 'Jiro Sato',
        age: 52,
        family: {
            wife: 'Masako Sato',
            child1: 'Yoshiko Sato',
            child2: 'Kojiro Sato'
        }
    },
    {
        id: 3,
        name: 'Saburo Kitajima',
        age: 78,
        family: {
            wife: 'Umeko Kitajima',
            child1: 'Sakura Kitajima',
            child2: 'Momoko Kitajima'
        }
    }
];
const firstChild = [];

for (const { name: n, family: { child1: c } } of families) {
    firstChild.push({ head: n, child: c });
}
console.log(firstChild);
// [
//     { head: 'Taro Yamada', child: 'Kotaro Yamada' },
//     { head: 'Jiro Sato', child: 'Yoshiko Sato' },
//     { head: 'Saburo Kitajima', child: 'Sakura Kitajima' }
// ]

// idが2のデータの存在を確認
const id2Flag = families.some(fam => fam.id === 2);
console.log(id2Flag);

// 年齢が60歳未満の世帯主氏名リストを作成
const under60 = families.filter(fam => fam.age < 60).map(fam => fam.name);
console.log(under60);

// 各家族の子供をchildrenというリストで追加した後、すべての子供のリストを作成
const newFamilies = families.filter(fam => fam['children'] = [fam.family.child1, fam.family.child2]);
const allChildren = newFamilies.flatMap(fam => fam.children);
console.log(allChildren);

// オブジェクトのキー/値を変数化
const keyVer = 'second';
const valueVer = 4;
const object2 = {
    first: 1,
    [keyVer]: 2,
    third: 3,
    forth: valueVer
};

console.log(object2)
// { first: 1, second: 2, third: 3, forth: 4 }

// ディープコピー
const object3 = JSON.parse(JSON.stringify(object2));
object3.third = 333;
console.log(object2);
// { first: 1, second: 2, third: 3, forth: 4 }

const object4 = {
    a: undefined,
    b: () => 'bbb'
};
const object5 = JSON.parse(JSON.stringify(object4));
console.log(object5);
// {}

// 上記のディープコピーではプロパティによっては正しくコピーできない
// npm install -S lodash
import _ from 'lodash';

const object6 = _.cloneDeep(object4);
object6.a = 333;
console.log(object4);
// { a: undefined, b: [Function: b] }

// 高パフォーマンスでディープコピーを行いたい場合
// npm install -S clone-deep
import cloneDeep from 'clone-deep';

const object7 = cloneDeep(object4);
object7.a = 333;
console.log(object4);
