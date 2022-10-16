export default class CacheMemory {
    constructor(numberOfLines, Array, currentIndex, missOrhit) {
        this.numberOfLines = numberOfLines;
        this.Array = Array;
        this.currentIndex = currentIndex;
        this.missOrhit = missOrhit;

        // Khai báo 2 phương thức missOrHit và getData.
        this.missOrHit = function () {
            return this.missOrhit;
        }
        this.getData = function () {
            return this.Array;
        }
    }
}