let slider;
let content = '';
let shake = false;
let shakeOffset = 0;
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#D1E3DD");
  let input = createInput();
  input.position(10, 10);
  input.changed(() => {
    content = input.value();
  });

  slider = createSlider(29, 54, 32);
  slider.position(input.x + input.width + 10, 10);

  let shakeButton = createButton('震動');
  shakeButton.position(slider.x + slider.width + 150, 10);
  shakeButton.style('border-radius', '50%');
  shakeButton.style('border', 'none'); // 去除按鈕的外框
  shakeButton.mousePressed(() => {
    shake = !shake;
  });

  let dropdown = createSelect();
  dropdown.position(shakeButton.x + shakeButton.width + 20, 10);
  dropdown.option('淡江大學');
  dropdown.option('淡江教科');
  dropdown.option('HACKMD');
  dropdown.changed(() => {
    let item = dropdown.value();
    if (iframe) {
      iframe.remove();
    }
    iframe = createElement('iframe');
    iframe.position(100, 100);
    iframe.size(windowWidth - 200, windowHeight - 200);
    if (item === '淡江大學') {
      iframe.attribute('src', 'https://www.tku.edu.tw/');
    } else if (item === '淡江教科') {
      iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    } else if (item === 'HACKMD') {
      iframe.attribute('src', 'https://hackmd.io/@YVftHL_lTX6HkKxC8S44Pw/B1GLu5fsJe');
    }
  });
}

function draw() {
  background("#D1E3DD");
  textSize(slider.value());
  fill("#F3FFC6");

  if (shake) {
    shakeOffset = sin(frameCount * 0.3) * 5;
  } else {
    shakeOffset = 0;
  }

  for (let y = 0; y < height; y += 40) {
    for (let x = 0; x < width; x += textWidth(content) + 10) {
      text(content, x, y + shakeOffset);
    }
  }

  // 固定顯示滑桿的文字大小
  textSize(16);
  fill(0);
  text('文字大小: ' + slider.value() + 'px', slider.x + slider.width + 10, 25);
}
