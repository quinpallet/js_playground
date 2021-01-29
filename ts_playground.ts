// クラス定義

// IPointインターフェースを定義
interface IPoint {
    x: number;
    y: number;
}

// IPointインターフェースを実装するPointクラスを定義
class Point implements IPoint {
    // static RAD2DEG: number = 180 / Math.PI;
    // const RAD2DEG: number = 180 / Math.PI; // NG - クラス内では使用できない
    static get RAD2DEG(): number {
        return 180 / Math.PI;
    }

    constructor(public x: number = 0, public y: number = 0) {
        // コンストラクタの引数にデフォルト値を設定することで代入文が不必要になる
        // this.x = x;
        // this.y = y;
    }

    // getアクセサ
    // getLength(): number {
    get length(): number {
        const square: number = this.x * this.x + this.y * this.y;

        return Math.sqrt(square);
    }

    // setアクセサ
    set length(length: number) {
        const point: IPoint = Point.getPolar(length, this.angle);
        this.x = point.x;
        this.y = point.y;
    }

    // getAngle(): number {
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    set angle(angle: number) {
        const point: IPoint = Point.getPolar(this.length, angle);
        this.x = point.x;
        this.y = point.y;
    }

    // インスタンスを生成せずに使用できるメソッド（static）
    // Point.polar(length, angle)
    static polar(length: number, angle: number): Point {
        const point: IPoint = Point.getPolar(length, angle);

        return new Point(point.x, point.y);
    }

    // クラス内からのみ使用できるメソッド（protected）
    protected static getPolar(length: number, angle: number): IPoint {
        const x: number = length * Math.cos(angle);
        const y: number = length * Math.sin(angle);

        return {x: x, y: y};
    }
}
console.log(new Point()); // Point { x: 0, y: 0 }
console.log(new Point(1)); // Point { x: 1, y: 0 }
console.log(new Point(1, 2)); // Point { x: 1, y: 2 }
// 直角三角形（3:4:5）
console.log('\n直角三角形（3:4:5）');
let point1 = new Point(3, 4);
console.log('length, angle(°) =', point1.length, point1.angle * Point.RAD2DEG); // 5
// 直角三角形（1:√3:2）
console.log('\n直角三角形（1:√3:2）');
point1.length = 2;
point1.angle = Math.PI / 3; // ラジアン（60度）
console.log('x, y =', point1.x, point1.y); // 1.0000000000000002 1.7320508075688772
// 極座標（3:4:5）
console.log('\n直角三角形（3:4:5）');
console.log(Point.polar(5, Math.atan2(4, 3))); // Point { x: 3.0000000000000004, y: 3.9999999999999996 }
// console.log(Point.getPolar(5, Math.atan2(4, 3))) // NG

// PointのサブクラスVectorを定義
class Vector extends Point {
    constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    // 座標をスカラー倍するメソッド
    // scale(scaleX: number, scaleY?: number): void {
    //     this.x *= scaleX;
    //     this.y *= isNaN(scaleY) ? scaleX : scaleY;
    // }

    // DenoにisNaNは実装されていないので回避コード
    scale(scaleX: number, scaleY?: number | undefined): void {
        this.x *= scaleX;
        this.y *= scaleY == null ? scaleX : scaleY;
    }

    //
    add(point: IPoint): void {
        this.x += point.x;
        this.y += point.y;
    }

    static polar(length: number, angle: number): Vector {
        // PointのサブクラスなのでgetPolarメソッドにアクセスできる
        const point: IPoint = Point.getPolar(length, angle);

        return new Vector(point.x, point.y);
    }
}

// 直角三角形（1:√3:2）
console.log('\n直角三角形（1:√3:2）');
const point2: Vector = new Vector(1, 0); // xのみサイズを変える
point2.scale(2); // xを2倍
point2.add(new Vector(-1, Math.sqrt(3))); // xに-1を足して（x-1=1）yに√3を足す
// lengthは2、angleは60
console.log('length, angle(°) =', point2.length, point2.angle * Point.RAD2DEG);

const point3: Vector = Vector.polar(2, Math.PI / 3);
console.log('length, angle(°) =', point3.length, point3.angle * Point.RAD2DEG);
console.log('x, y =', point3.x, point3.y);

// アロー関数式（変数の型指定）
console.log('\n直角三角形（3:4:5）');
let triangle1: (x: number, y: number) => number;
triangle1 = (x, y) => Math.sqrt(x ** 2 + y ** 2);
console.log(triangle1(3, 4));

// アロー関数式のthis参照
console.log('\n直角三角形（3:4:5）');
let side_a = 3;
let side_b = 4;
let triangle2 = {
    a: side_a,
    b: side_b,
    c: Math.sqrt(side_a * side_a + side_b * side_b),
    sides: function(): void {
        // // NG(関数内で外部のthisは参照できない)
        // setTimeout(function(): void {
        //     console.log(`${this.a} : ${this.b} : ` + Math.sqrt(this.a * this.a + this.b * this.b));
        // }, 100);

        // // 関数外のthisをバインドすることで参照可能
        // setTimeout(function(): void {
        //     console.log(`${this.a} : ${this.b} : ` + Math.sqrt(this.a * this.a + this.b * this.b));
        // }.bind(this), 100);

        // アロー関数内では同一スコープ内のthisがそのまま参照可能
        setTimeout((): void => {
            console.log(`${this.a} : ${this.b} : ` + Math.sqrt(this.a * this.a + this.b * this.b));
        }, 100);
    }
}

triangle2.sides();
