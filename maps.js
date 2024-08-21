const canvas = document.getElementById('biomeCanvas');
const ctx = canvas.getContext('2d');

// シード値
let seed = Math.floor(Math.random() * 1000);

// 色の生成関数
Colors = {};
Colors.names = {
    grassland: "#00FF00",
    desert: "#EAECEE",
    forest: "#228B22",
    mountain: "#A9A9A9",
    ocean: "#0000FF"
};

Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return { name: result, rgb: this.names[result]};
};

Colors.generateVariations = function(baseColor, count) {
    let variations = [];
    for (let i = 0; i < count; i++) {
        let hue = baseColor.hue + (Math.random() - 0.5) * 30;
        let saturation = baseColor.saturation + (Math.random() - 0.5) * 30;
        let lightness = baseColor.lightness + (Math.random() - 0.5) * 30;
        variations.push({ hue: hue, saturation: saturation, lightness: lightness });
    }
    return variations.map(variation => {
        return `hsl(${variation.hue}, ${variation.saturation}%, ${variation.lightness}%)`;
    });
};

// バイオームデータの生成
function generateBiomes(seed) {
    let biomes = [];
    for (let i = 0; i < canvas.width; i++) {
        biomes[i] = [];
        for (let j = 0; j < canvas.height; j++) {
            let biomeType = Math.floor(Math.random() * 5);
            let biomeColors = [];
            for (let k = 0; k < 3; k++) {
                let color = Colors.random();
                biomeColors.push(color);
            }
            biomes[i][j] = { type: biomeType, colors: biomeColors };
        }
    }
    return biomes;
}

// バイオームの描画
function drawBiomes(biomes) {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let biome = biomes[x][y];
            for (let color of biome.colors) {
                ctx.fillStyle = color.rgb;
                ctx.fillRect(x, y, 10, 10);
                y += 20;
            }
        }
    }
}

// メイン関数
function main() {
    const biomes = generateBiomes(seed);
    drawBiomes(biomes);
}

main();
