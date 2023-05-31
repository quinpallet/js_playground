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
import _, { isNumber } from 'lodash';

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

// 条件式から否定を除去する
// 値が数値でも文字列でもない場合
if (!isNumber(value) && !isString(value)) {
    console.log('not a number and not a string');
}
// ド・モルガンの法則
// !X && !Y == !(X || Y)
// !X || !Y == !(X && Y)
if (!(isNumber(value) || isString(value))) {
    console.log('not a number and not a string');
}
// さらに否定を取り除く場合
if (isNumber(value) || isString(value)) {
    ;
} else {
    console.log('not a number and not a string');
}

// 想定外のエラーを例外処理で問題の特定
{
let i = 1;

try {
    i = i * j;
} catch(e) {
    console.log(`${e.name}: ${e.message}`);
} finally {
    console.log('処理は完了しました。');
}
// ReferenceError: j is not defined
// 処理は完了しました。
}

// 例外をスローする
// Errorの詳細は https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error
{
let x = 1;
let y = 0;

try {
    if (y === 0) {
        throw new Error('0で除算しようとしました。');
    }
    let z = x / y;
} catch(e) {
    console.log(e.message);
}
// 0で除算しようとしました。
}

// 主なエラー
// EvalError       不正なeval関数
// RangeError      指定された値が許容範囲を超えている
// ReferenceError  宣言されていない変数にアクセスした
// SyntaxError     文法エラー
// TypeError       指定された値が期待されたデータ型でない
// URIError        不正なURI

// 文字列の長さを取得する
// サロゲートペア（UTF-16）：1文字を4バイトで表現する文字
{
let str1 = '黒崎健一';
console.log(str1.length); // 4

let str2 = '黒𥔎健一';
console.log(str2.length); // 5
console.log([...str2].length);
}

// 数値形式を変換する
{
let num1 = 255;

console.log(num1.toString(16)); // ff
console.log(num1.toString(8));  // 377

let num2 = 123.45678;
console.log(num2.toExponential(2)); // 1.23e+2
console.log(num2.toFixed(3));       // 123.457
console.log(num2.toFixed(7));       // 123.4567800
console.log(num2.toPrecision(10));  // 123.4567800
console.log(num2.toPrecision(6));   // 123.457
}

// より細かなスタイルを定義する
// optionsなどの詳細は https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
{
let num = 1234.567;
let fmt = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    currencyDisplay: 'symbol'
});
console.log(fmt.format(num));
}

// 指定月の最終日を取得
{
let dat = new Date(2023, 5, 22);
console.log(dat);                   // 指定月（6月）の前月
dat.setMonth(dat.getMonth() + 1);   // 指定月（6月）を設定
dat.setDate(0);                     // 0日目を設定
console.log(dat);                   // 指定月（6月）の最終日
console.log(dat.getDate());
}

// 日付／時刻の差を求める
{
let dt1 = new Date(2023, 10, 15);
let dt2= new Date(2023, 11, 20)
let diff = (dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24); // ミリ秒を日に換算
console.log(`${diff}日の差があります。`);
}

// 日付／時刻値を文字列に変換する
{
let dt = new Date(2023, 5, 22, 9, 30, 45, 368);
console.log(dt.toLocaleString());       // 2023/6/22 9:30:45
console.log(dt.toLocaleDateString());   // 2023/6/22
console.log(dt.toLocaleTimeString());   // 9:30:45
console.log(dt.toISOString());          // 2023-06-22T00:30:45.368Z
console.log(dt.toDateString());         // Thu Jun 22 2023
console.log(dt.toJSON());               // 2023-06-22T00:30:45.368Z
}

// より細かなスタイルを定義する
// optionsなどの詳細は https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
{
let dt = new Date(2023, 5, 2, 9, 30, 45, 368);
let fmt = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'long',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    dayPeriod: 'short'
});
console.log(fmt.format(dt));    // 2023年6月22日木曜日 朝09:30:45
}

// 配列の要素を追加／削除する
{
let list = ['松', '竹', '梅'];
list.push('桜');
list.unshift('桃', '杏');
console.log(list);          // [桃', '杏', 松', '竹', '梅', '桜']
console.log(list.pop());    // 桜
console.log(list.shift());  // 桃
console.log(list);          // ['杏', 松', '竹', '梅']
}
// 破壊的メソッド
// splice, copyWithin, fill, pop, push, shift, unshift, reverse, sort

// クラスのカプセル化と継承
{
class Member {
    // プライベートプロパティ
    #name = '';
    #age = 0;
    #birth = new Date();

    constructor(name, birth) {
        this.#name = name;
        this.#birth = new Date(birth);
        this.#age = ((new Date() - this.#birth) / (1000 * 60 * 60 * 24) / 365).toFixed(0);
        Object.freeze(this);    // 不変クラス（インスタンス）として定義
    }

    // nameゲッター
    get name() {
        return this.#name;
    }

    // ageゲッター
    get age() {
        return this.#age;
    }

    // birthゲッター
    get birth() {
        let fmt = new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'long'
        });
        return fmt.format(this.#birth);
    }

    // birthセッター
    set age(value) {
        if (typeof(value) !== 'number' || value < 0) {
            throw new TypeError('ageは0以上の数値で指定してください。');
        }
        this.#age = value;
    }

    // プライベートメソッド
    #createMessage() {
        return `私の名前は${this.#name}、${this.#age}歳です。`;
    }

    // パブリックメソッド
    show() {
        console.log(this.#createMessage());
    }

    // nameだけを変更した複製を生成
    withName(name) {
        if (typeof(name) !== 'string' || !name) {
            throw new TypeError('nameは空文字でない文字列で指定してください。');
        }
        return new Member(name, this.#birth.toLocaleDateString());
    }
}
Object.freeze(Member.prototype);    // 不変クラス（プロトタイプ）として定義

let m = new Member('黒崎健一', '1960/01/22');
m.show();               // 私の名前は黒崎健一、77歳です。
// console.log(m.#name);   // Private field '#name' must be declared in an enclosing class
// m.#createMessage();     // Private field '#createMessage' must be declared in an enclosing class
console.log(m.birth);
// m.age = -44;            // ageは0以上の数値で指定してください。
// m.withName('');         // nameは空文字でない文字列で指定してください。
let m2 = m.withName('黒碕健一');
m2.show();
console.log(m2.birth);

class BusinessMember extends Member {
    constructor(name = '名無しのゴンベイ', birth = '2003/04/01') {
        super(name, birth);
    }

    work() {
        return `${this.name}は働いています。`;
    }
}

let bm = new BusinessMember('田中太郎');
bm.show();
console.log(bm.work());
}

// オブジェクトの型を判定する
{
class Animal {}
class Hamster extends Animal {}

let ani = new Animal();
let ham = new Hamster();
// constructorプロパティ
// オブジェクトの生成元のコンストラクターで確認する
console.log(ani.constructor === Animal);    // true
console.log(ham.constructor === Animal);    // false
console.log(ham.constructor === Hamster);   // true

// instanceof演算子
// インスタンスが作成されたクラスを確認する
console.log(ham instanceof Animal);     // true
console.log(ham instanceof Hamster);    // true
console.log(ham instanceof Object);     // true

// isPrototypeOfメソッド
// オブジェクトが参照しているプロトタイプを確認する
console.log(Hamster.prototype.isPrototypeOf(ham));  // true
console.log(Animal.prototype.isPrototypeOf(ham));   // true
console.log(Object.prototype.isPrototypeOf(ham));   // true
}

// モジュール
// module_basic.html
// <script type="module" src="script/module_basic.js"></script>

// lib/util.js
const AUTHOR = 'YAMADA, Taro';

export function getTriangleArea(base, height) {
    return base * height / 2;
}

export class Member {
    ;
}

// module_basic.js
import { getTriangleArea, Member } from './lib/util.js';

console.log(getTriangleArea(10, 2));

let m = new Member('佐藤二朗', 58);
m.show();

// module_import_all.js
import * as app from './lib/util.js';

let m2 = new app.Member('佐藤二朗', 58);
m2.show();

// module_import_allas.js
import { getTriangleArea as triangle, Member } from './lib/util.js';

console.log(triangle(10, 2));

// lib/area.js
export const VERSION = '2.0';

export default class {
    static circle(radius) {
        return (radius ** 2) * Math.PI;
    }
}

// module_import_default.js
import Area from './lib/area.js';

console.log(Area.circle(10));

// module_import_dynamic.js
import('./lib/util.js').then(util => {
    console.log(util.getTriangleArea(10, 2));

    let m = new util.Member('佐藤二朗', 58);
    m.show();
});

// lib/export_main.js
import { hoge } from './sub1.js';
import { foo, bar as myBar } from './sub2.js';

export {hoge, foo, myBar };

// ES2020
export { hoge } from './sub1.js';
export { foo, bar as myBar } from './sub2.js';

// 既定のエクスポートを再エクスポート
export { default as hoge } from './def1.js';
export { default as foo, bar } from './def2.js';

// 他のモジュールからインポートしたメンバーを既定のエクスポートとして再エクスポート
export { hoge as default } from './sub1.js';

// DOM
// ノードウォーキング
// <form>
//     <label for="material">素材</label>
//     <select id="material">
//         <option value="アルミ">アルミ</option>
//         <option value="銅">銅</option>
//         <option value="鉄">鉄</option>
//     </select>
//     <input type="submit" value="送信" />
// </form>
{
// 子要素を取得
let s = document.querySelector('#material');
let opts = s.children;

for (let opt of opts) {
    console.log(opt.value);
}

// childNodesプロパティ
let opts2 =s.childNodes;

for (let opt of opts2) {
    if (opt.nodeType === 1) {
        console.log(opt.value);
    }
}

// firstElementChild/nextElementSiblingプロパティ
let child = s.firstElementChild;

while (child) {
    console.log(child.value);
    child = child.nextElementSibling;
}
}

// すべての属性を取得する
// <img id="logo" src="https://quinpallet.jp/image/quinpallet.jpg"
//     height="67" width="215"
//     title="Quinpalletロゴ"
//     alt="Quinpallet" />
{
let img = document.querySelector('#logo');
let attrs = img.attributes;

for (let attr of attrs) {
    console.log(`${attr.name}: ${attr.value}`);
}
}

// 入力要素の現在地を取得／設定
// <form>
//    <div>
//       <label for="name">氏名：</label>
//       <input id="name" type="text" name="name" value="初期値" />
//    </div>
//     <input id="btn" type="submit" value="送信" />
// </form>
{
let member = document.querySelector('#name');

document.querySelector('#btn').addEventListener('click', function() {
    console.log(member.value);                  // クリック時の入力値
    console.log(member.getAttribute('value'));  // 初期値
});
}

// ブラウザオブジェクト
// タイマー機能
// <input id="btn" type="button" value="タイマー停止" />
// <div id="result"></div>
{
let result = document.querySelector('#result');
let timer = window.setInterval(function() {
    result.textContent = (new Date()).toLocaleTimeString();
}, 5000);

document.querySelector('#btn').addEventListener('click', function() {
    window.clearInterval(timer);
}, false);
}

// 引数付き関数
{
let handler = function(message) {
    console.log(message);
}

setTimeout(handler, 500, '開始時間です。始めてください。');
setTimeout(handler, 10000, '終了です。作業を止めてください。');
}

// 非同期処理を使用した重い処理の実行
{
setTimeout(function() { heavy(); }, 0); // 非同期処理を目的として0msを使用するならpostMessageメソッドを利用
}

// ウインドウサイズ/位置の取得
// <input id="btn" type="button" value="全画面" />
{
document.querySelector('#btn').addEventListener('click', function() {
    document.body.requestFullscreen(); // ブラウザを全画面表示
}, false);
}

// スクロール位置の設定/取得
// <div id="main">
//     <div id="chap_1">
//         <h3>Part 1：JavaScriptとは？</h3>
//     </div>
// </div>
{
document.querySelector('#main').addEventListener('click', function() {
    window.scrollBy(0, window.innerHeight); // 表示サイズ（垂直方向）分だけスクロール
}, false);
}

// 表示ページのアドレス情報を取得/操作
// https://developer.mozilla.org/ja/docs/Web/API/Location

// ページ移動でブラウザに移動履歴を残さない
location.replace('https://developer.mozilla.org/ja/docs/Web/API/Location'); // [戻る]ボタンで戻らない

// location.href ≒ location.assign('')
// assign()はクロスオリジンのアクセスを許さない

// JavaScriptによる操作をブラウザの履歴に残す
// <input id="btn" type="button" value="カウントアップ" />
// <span id="result">ー</span>回クリックされました。
{
let count = 0;
let result = document.querySelector('#result');

document.querySelector('#btn').addEventListener('click', function() {
    result.textContent = ++count;
    history.pushState(count, '', '/url-of-this-page'); // 現在のページにcount値を紐付ける
});

// [戻る]ボタンでページの状態を元に戻す
window.addEventListener('popstate', function(e) {
    count = e.state; // 紐付けられたcount値を取得
    result.textContent = count;
});
}

// Web Storageでデータをブラウザに保存
// ローカルストレージ（localStorage）
// 　オリジン単位でデータを管理。ウインドウ/タブ間でデータ共有可能。
// 　ブラウザを閉じてもデータは維持される。
// セッションストレージ（sessionStorage）
// 　現在のセッションでだけデータを管理。ウインドウ/タブ間でデータ共有不可。
// 　ブラウザを閉じたタイミングでデータは破棄される。
{
let storage = localStorage;

storage.setItem('fruit1', 'りんご');
storage.fruit2 = 'みかん';
storage['fruit3'] = 'ぶどう';

console.log(storage.getItem('fruit1')); // りんご
console.log(storage.fruit2);            // みかん
console.log(storage['fruit3']);         // ぶどう

storage.removeItem('fruit1');
delete storage.fruit2;
delete storage['fruit3'];

let apple = { name: 'りんご', price: 128, made: '青森' };

storage.setItem('apple', JSON.stringify(apple));    // オブジェクトを保存するには復元可能な文字列に変換

let data = JSON.parse(storage.getItem('apple'));    // データを取り出したあと復元

console.log(data.name);
console.log(data);
}

// ストレージで名前の衝突を防ぐ
{
class AppStorage {
    #app;
    #storage = localStorage;
    #data;

    constructor(app) {
        this.#app = app;    // アプリ名の設定
        this.#data = JSON.parse(this.#storage[this.#app] || '{}');  // 未定義の場合はからオブジェクトを設定
    }

    getItem(key) {
        return this.#data[key];
    }

    setItem(key, value) {
        this.#data[key] = value;
    }

    save() {
        this.#storage[this.#app] = JSON.stringify(this.#data);
    }
}

let storage = new AppStorage('myStorage');

storage.setItem('hoge', 'ほげ');
console.log(storage.getItem('hoge'));
storage.save();
}

// ストレージの変更を監視
{
window.addEventListener('storage', function(e) {
    console.log(`
    変更されたキー： ${e.key}
    変更前の値： ${e.oldValue}
    変更後の値： ${e.newValue}
    発生元のページ： ${e.url}`);
}, false);

let storage = localStorage;

storage.setItem('myData', 'マイデータ');
}

// Fetch API
// ※HTTPサーバを起動して実行

// book.json:
// {
//     "title": "TypeScript入門",
//     "price": 3400,
//     "publisher": "ほげ書房"
// }

fetch('book.json')
    .then(res => res.json())                // 取得データをjsonメソッドでJSON文字列として取得
    .then(data => console.log(data.title)); // JSONデータのtitleプロパティ値を出力

// 通信エラー処理を追加

fetch('book.json')
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('指定のリソースが無効です。');
    })
    .then(data => console.log(data.title))
    .catch(e => window.alert(`エラー：${e.message}`));

// クエリ情報でデータを送信

// fetch_query.html:
// <form id="myform">
//     <label for="name">名前：</label>
//     <input id="name" name="name" type="text" size="20" />
//     <input id="btn" type="button" value="送信" />
// </form>
// <p id="result"></p>
//
// fetch_query.php:
// <?php
// $name = htmlspecialchars($_GET['name'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
// if ($name !== '') {
//     print('こんにちは、'.$name.'さん！');
// }

{
let result = document.querySelector('#result');

document.querySelector('#btn').addEventListener('click', function() {
    let params = new URLSearchParams();

    params.set('name', document.querySelector('#name').value);  // URLSearchParamsでは自動的にエスケープされる
    fetch(`fetch_query.php?${params.toString()}`)
        .then(res => res.text())
        .then(text => result.textContent = text);
}, false);
}
// 生成されたクエリ情報付きアドレス
// http://localhost/fetch_query.php?name=%E9%BB%92%E5%B4%8E%E5%81%A5%E4%B8%80

// データをPOST送信
{
let data = new FormData(document.querySelector('#myform'));

fetch('fetch_post.php', {
    method: 'POST',
    body: data,
})
    .then(res => res.text())
    .then(text => result.textContent = text);
}

// ファイルをアップロードする

// <form>
//     <input id="upfile" name="upfile" type="file" />
// </form>
// <div id="result"></div>

{
let result = document.querySelector('#result');
let upfile = document.querySelector('#upfile');

upfile.addEventListener('change', function() {
    let f = upfile.files[0];
    let data = new FormData();

    data.append('upfile', f, f.name);
    fetch('fetch_upload.php', {
        method: 'POST',
        body: data,
    })
        .then(res => res.text())
        .then(text => result.textContent = text);
}, false);
}

// CORS対応

{
fetch(`fetch_query.php?${params.toString()}`);
fetch(`fetch_query.php?${params.toString()}`, {
    mode: 'cors'        // default（CORS有効）
    // mode: 'same-origin' // クロスオリジンを許可しない
});
}
// サーバ側での対応が必要
// HTTPヘッダーにアクセスを許可するオリジンを設定する
// Access-Control-Allow-Origin: *                   // すべてのオリジンを許可
// Access-Control-Allow-Origin: https://hoge.jp     // 指定されたオリジンを許可

// プロキシを利用した通信

// サーバ側プロキシ
// <?php
// header('Content-Type: application/json;charset=UTF-8');
// $url = 'https://b.hatena.ne.jp/entry/jsonlite/?url='.$_GET['url'];
// print(file_get_contents($url, false, stream_context_create(['http' =>
//     ['header' => 'User-Agent: MySample']])));

// クライアント側ページ
// <form>
//     <label for="url">URL：</label>
//     <input id="url" type="text" name="url" size="50"
//      value="https://developer.mozilla.org/ja/" />
//     <input id="btn" type="button" value="検索" />
// </form>
// <hr />
// <div id="result"></div>

// クライアント側処理
{
let result = document.querySelector('#result');
document.querySelector('#btn').addEventListener('click', function() {
let params = new URLSearchParams();

params.set('url', document.querySelector('#url').value);
result.textContent = '通信中...';

fetch(`bookmark.php?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let ul = document.createElement('ul');

        for (let bm of data.bookmarks) {
            let li = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.href = `https://b.hatena.ne.jp/${bm.user}`;
            anchor.textContent = `${bm.user} ${bm.comment}`;
            li.append(anchor);
            ul.append(li);
        }
        result.replaceChild(ul, result.firstChild);
    })
    .catch(ex => console.log(ex));
}, false);
}

// CORS対策（JSONP: JSON with Padding）

// クライアント側ページ
// 以下JSONPライブラリを読み込む（https://github.com/camsong/fetch-jsonp）
// <script type="text/javascript" src="fetch-jsonp-master/build/fetch-jsonp.js"></script>

// クライアント側処理
// 以下プロキシを介していた部分を直接アクセスするオリジンを設定
// fetch(`bookmark.php?${params.toString()}`)
//  ↓
// fetchJsonp(`https://b.hatena.ne.jp/entry/jsonlite/?${params.toString()}`)

// クロスオリジン対応メッセージング

// cross_main.html:
// <form>
//     <input id="message" type="text" size="80"
//     <input id="btn" type="button" value="送信" />
// </form>
// <iframe id="frame" src="http://localhost:8000/cross_other.html" height="200" width="350"></iframe>

// corss_other.html:
// <div id="result"></div>

// cross_main.js:
{
let target = 'http://localhost:8000';
let frame = document.querySelector('#frame');
let message = document.querySelector('#message');

document.querySelector('#btn').addEventListener('click', function() {
    frame.contentWindow.postMessage(message.value, target);
}, false);
}

// cross_other.js:
{
let origin = 'http://localhost:3000';
let result = document.querySelector('#result');

window.addEventListener('message', function(e) {
    if (e.origin !== origin) {
        return;
    }
    result.textContent = e.data;
}, false);
}

// 非同期処理（Promiseオブジェクト）
{
function asyncProcess(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value) {
                resolve(`入力値：${value}`);
            } else {
                reject('入力は空です');
            }
        }, 500);
    })
}

asyncProcess('ケンイチ')
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`))
    .finally(() => console.log('処理終了'));
// 入力値：ケンイチ
// 処理終了

// thenとcatchメソッドはまとめて記述可能
asyncProcess('ケンイチ')
    .then(
        response => console.log(response),
        error => console.log(`エラー：${error}`)
    )
    .finally(() => console.log('処理終了'));


// 非同期処理を連結
asyncProcess('ケンイチ')
    .then(response => {
        console.log(response);
        return asyncProcess('タケシ');
    })
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`))
    .finally(() => console.log('処理終了'));
// 入力値：ケンイチ
// 入力値：タケシ
// 処理終了

// 複数の非同期処理を並行して実行
// すべての非同期処理が成功した場合にコールバック
Promise.all([
    asyncProcess('ケンイチ'),
    asyncProcess('タケシ'),
    asyncProcess('名無しのゴンベイ')
])
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`))
// ['入力値：ケンイチ', '入力値：タケシ', '入力値：名無しのゴンベイ']

// すべての非同期処理が終了した場合にコールバック
Promise.allSettled([
    asyncProcess('ケンイチ'),
    asyncProcess('タケシ'),
    asyncProcess('名無しのゴンベイ')
])
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`))
// [
//     {
//         "status": "fulfilled",
//         "value": "入力値：ケンイチ"
//     },
//     {
//         "status": "fulfilled",
//         "value": "入力値：タケシ"
//     },
//     {
//         "status": "fulfilled",
//         "value": "入力値：名無しのゴンベイ"
//     }
// ]

// 複数の非同期処理を並行して実行
// すべての非同期処理のどれかが完了した時点でコールバック（エラー結果も含む）
Promise.race([
    asyncProcess(),
    asyncProcess('タケシ'),
    asyncProcess('名無しのゴンベイ')
])
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`));
// エラー：入力は空です

// 複数の非同期処理を並行して実行
// すべての非同期処理のどれかが完了成功した時点でコールバック（エラー結果は含まない）
Promise.any([
    asyncProcess(),
    asyncProcess('タケシ'),
    asyncProcess('名無しのゴンベイ')
])
    .then(response => console.log(response))
    .catch(error => console.log(`エラー：${error}`));
// 入力値：タケシ
}

// 非同期処理を連結
{

}

// 非同期処理（Promiseオブジェクト）
{
function asyncProcess(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof value === 'number') {
                resolve(value ** 2);
            } else {
                reject('引数valueは数値でなければなりません。');
            }
        }, 500);
    })
}

async function main() {
    let result1 = await asyncProcess(2);        // awaitを宣言することで非同期処理の終了を待つ
    let result2 = await asyncProcess(result1);  // 前のawait処理を待つ（前処理の結果を使う）
    let result3 = await asyncProcess(result2);  // 前のawait処理を待つ（前処理の結果を使う）

    return result3;
}

main()
    .then(
        response => console.log(response),
        error => console.log(`エラー：${error}`)
    );
}

// Web Worker

// worker.js:
{
self.addEventListener('message', function(e) {  // selfはワーカーでのグローバルオブジェクト（メインスレッドでのwindowに相当）
    // 1〜targetの範囲でxの倍数がいくつあるか算出する
    let count = 0;

    for (let i = 0; i < e.data.target; i++) {
        if (i % e.data.x === 0) {
            count++;
        }
    }
    this.postMessage(count);    // メインスレッドに算出値を返す
}, false);
}

// worker_client.html:
// <form>
//     <input id="target" type="number" value="1000000" />以下：
//     <input id="x" type="number" value="7" />の倍数の個数＝
//     <span id="result">ー</span>
//     <input id="btn" type="button" value="計算" />
// </form>

// worker_client.js:
{
let target = document.querySelector('#target');
let x = document.querySelector('#x');
let result = document.querySelector('#result');

document.querySelector('#btn').addEventListener('click', function() {
    let worker = new Worker('worker.js');

    worker.postMessage({
        target: target.value,
        x: x.value
    });
    result.textContent = '計算中...';

    worker.addEventListener('message', function(e) {
        result.textContent = e.data;
    }, false);
    worker.addEventListener('error', function(e) {
        result.textContent = e.message;
    }, false);
});
}

// テストを自動化する
// 単体テスト支援ライブラリJestを利用（https://jestjs.io）

// Member.js:
{
class Mmeber {
    constructor(name = '名無しのゴンベイ') {
        this.name = name;
    }

    greet() {
        return `こんにちは、${this.name}さん！`;
    }
}
}

// Member.spec.js:
{
import Member from './Member.js';

describe('Jestの基本', () => {
    const NAME = '黒﨑健一';
    let m;

    // 前処理
    beforeEach(() => {
        m = new Member(NAME);
    });

    // 後処理
    afterEach(() => {
        console.log('Test is done');
    });

    // テストケース
    it('greetメソッドの確認', () => {
        let result = m.greet();

        expect(m.name).toBe(NAME);
        expect(result).toContain(NAME);
    });
});
}

// Vite

// npm create vite@latest  // Viteでプロジェクトを作成
// cd vite-project         // 作成したプロジェクトディレクトリに移動
// npm install             // ライブラリのインストール
// npm run dev             // 開発サーバでアプリを実行

// npm run build           // 本番環境用ビルド
//                         // distディレクトリ配下にアプリ一式作成

// スタイルシートをインポート
{
import './style.css'
}

// npm install --save-dev sass     // Sass(SCSS)をインストール

{
import './style.scss'
}

// 画像リソース対応
{
import imgUrl from './images/wings.jpg'

let img = new Image();
img.src = imgUrl;
document.querySelector('#app').append(img);
}

// 性的にインポートできないファイルは、プロジェクトルート直下の
// /publicフォルダに配置することで、ビルド時に自動的に/distフォルダに
// コピーされる。その場合は/publicフォルダからの相対パスを指定する
// 必要がある。
{
img.src = 'images/wings.jpg'
}

// ESLint

// npm install --save-dev eslint       // ESLintをインストール
// npm init @eslint/config             // ESLintの設定ファイルを初期化

// package.jsonにショートカットコマンドを定義
// {
//     "name": "lint",
//     "script": {
//         "lint": "eslint ./src/*.js"
//     }
// }

// npm run lint

// ESLintルールのカスタマイズ
// .eslintrc.json:
// {
//     "env": {
//         "browser": true,
//         "es2021": true
//     },
//     "rules": {
//         "prefer-const": 1,          // letよりもconstを優先（0: off、1: warn、2: error）
//         "indent": [ "error", 4 ]    // インデントを半角4個で統一
//     }
// }

// <script>要素の属性

// crossorigin属性
// リクエスト時にユーザ資格情報（クッキー、クライアントサイド証明書、HTTP認証など）を
// 受け渡しするか定義する属性。一般的には、資格情報を必要とする状況はほとんどないはず
// なので、crossorigin="anonymous"としておく。
// ユーザ資格情報を常に送信する場合は、crossorigin="use-credentials"を指定する。
// <script>以外には、<audio>、<video>、<img>、<link>などがある。

// referrerpolicy属性
// リファラー（referrer）とは、あるリソースを参照するときにリンク元となるページのこと。
// リファラーの送信ルールを定義する属性。
// 一般的には、アクセス分析などで利用されるがパスワードリセットなどのページで、クエリ情報
// などに含まれる隠されるべき情報もリファラーとして送信されることがあるため、セキュリティ上
// 問題となる可能性がある。

// no-referrer                         リファラーを送信しない
// no-referrer-when-downgrade          HTTPS通信以外でリファラーを送信しない（デフォルト）
// origin                              オリジン（スキーム、ホスト、ポート番号）情報のみを送信
// origin-when-cross-origin            同じオリジンでは完全なパスを送信、異なるオリジンではオリジン部だけ送信
// same-origin                         同じオリジンでは送信、異なるオリジンには送信しない
// strict-origin                       HTTPS→HTTPなど安全性が低い相手には送信しない
// strict-origin-when-cross-origin     同じオリジンでは送信、異なるオリジンの場合は安全性が同等の場合にオリジン部分だけを送信、安全性が低い相手には送信しない
// unsafe-url                          常に完全なリファラーを送信（一般的には安全ではない）

// <script>以外には、<a>、<area>、<img>、<iframe>、<link>などがある。
