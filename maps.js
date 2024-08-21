const canvas = document.getElementById('biomeCanvas');
const ctx = canvas.getContext('2d');

// シード値
let seed = Math.floor(Math.random() * 1000);

// 色の生成関数
Colors = {};
Colors.names = {
    grassland: "#00C853",
    desert: "#FDF5E6",
    forest: "#228B22",
    mountain: "#A9A9A9",
    ocean: "#0000FF"
};

Colors.biomeColors = {
    grassland: ["#00C853", "#32CD32"],
    desert: ["#FDF5E6", "#FFFACD"],
    forest: ["#228B22", "#006400"],
    mountain: ["#A9A9A9", "#808080"],
    ocean: ["#0000FF", "#4169E1"]
};

// バイオームタイプを定義するオブジェクト
const biomeTypes = {
    grassland: "grassland",
    desert: "desert",
    forest: "forest",
    mountain: "mountain",
    ocean: "ocean"
};

Colors.random = function(range) {
    var start = parseInt(range[0].slice(1), 16);
    var end = parseInt(range[1].slice(1), 16);
    var randomValue = Math.floor(Math.random() * (end - start + 1)) + start;
    return '#' + ('000000' + randomValue.toString(16)).slice(-6);
};

// バイオームデータの生成
function generateBiomes(seed) {
    let biomes = [];
    let biomeWidths = [50, 70, 80, 60, 40];
    let biomeHeights = [30, 45, 55, 35, 25];
    for (let i = 0; i < canvas.width; i++) {
        biomes[i] = [];
        for (let j = 0; j < canvas.height; j++) {
            let biomeType = Math.floor(Math.random() * 5);
            let startX = Math.floor(Math.random() * (canvas.width - biomeWidths[biomeType]));
            let startY = Math.floor(Math.random() * (canvas.height - biomeHeights[biomeType]));
            let colorRange = Colors.biomeColors[biomeTypes[biomeType]];
            let color = Colors.random(colorRange);
            for (let x = startX; x < startX + biomeWidths[biomeType]; x++) {
                for (let y = startY; y < startY + biomeHeights[biomeType]; y++) {
                    biomes[x][y] = { type: biomeType, color: color };
                }
            }
        }
    }
    return biomes;
}

// バイオームの描画
function drawBiomes(biomes) {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let biome = biomes[x][y];
            if (biome) {
                ctx.fillStyle = biome.color;
                ctx.fillRect(x, y, 1, 1);
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
