---
title: ブラウザで音声入力の可視化と録音
date: 2017-06-19
---

とある技術相談が舞い込んできて、その時の返答を念のため後で技術検証した話。やりたいことは大まかに「ブラウザで音声入力をリアルタイムに可視化する」「ブラウザで音声入力を記録する」の2点で、音声入力は `getUserMedia()` で取得できて、可視化はそのデータを Canvas or WebGL でいじり、録音は `MediaRecorder` でやるのだろうと思いつつ、組み合わせて一応動く状態まで組んだ。

## `navigator.mediaDevices.getUserMedia()`

ユーザーのカメラやマイクの入力は `getUserMedia()` で取得できるが、一昔前までは `navigator` から生えていて、これが [`MediaDevices`](https://developer.mozilla.org/ja/docs/Web/API/MediaDevices) というメディア接続をまとめたオブジェクトへ移動したとともに、API も `Promise` インターフェースになっている。

```javascript
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
}).then(stream => {
  console.log(stream);
}).catch(error => {
  console.log(error);
});
```

## 音声入力ストリームを解析し波形表示

次に [`AudioContext`](https://developer.mozilla.org/ja/docs/Web/API/AudioContext) を利用して音声入力を解析し、Canvas に描画していく。`AudioContext` から音声入力のノードと解析ノードを生やしてそれぞれ接続する。`AutioContext` の `destination` へ接続すればブラウザから音声として出力されるが、ハウリングするので避けている。

解析ノードを参照して描画しているのが `draw()` で、これを `requestAnimationFrame()` 経由でドローコールしている。

```javascript
const canvas = document.querySelector('#canvas');
const drawContext = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
}).then(stream => {
  const audioContext = new AudioContext();
  const sourceNode = audioContext.createMediaStreamSource(stream);
  const analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  sourceNode.connect(analyserNode);

  function draw() {
    const barWidth = canvas.width / analyserNode.fftSize;
    const array = new Uint8Array(analyserNode.fftSize);
    analyserNode.getByteTimeDomainData(array);
    drawContext.fillStyle = 'rgba(0, 0, 0, 1)';
    drawContext.fillRect(0, 0, canvas.width, ch);

    for (let i = 0; i < analyserNode.fftSize; ++i) {
      const value = array[i];
      const percent = value / 255;
      const height = canvas.height * percent;
      const offset = canvas.height - height;

      drawContext.fillStyle = 'lime';
      drawContext.fillRect(i * barWidth, offset, barWidth, 2);
    }

    requestAnimationFrame(draw);
  }

  draw();
});
```

## MediaRecorderでメディアデータを保存する

あとは `#start` と `#stop` なボタンを用意して、それぞれを契機に音声入力をキャプチャして保存するということを [`MediaRecorder`](https://developer.mozilla.org/ja/docs/Web/API/MediaRecorder) を使ってやってみる。入力ストリームは既に Canvas への描画のために参照しているので、再度参照できるのか疑問だったが、結論同じストリームからキャプチャ操作などを実施できた。

`MediaRecorder` のインスタンスから音声入力ストリームを参照し、`start()` でキャプチャを開始する。`dataavailable` イベントで音声データが拾えるので配列に保存しておき、キャプチャの終了時に `Blob` でファイル化する。

```javascript
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

let mediaRecorder = null;
let mediaStream = null;

start.addEventListener('click', () => {
  start.disabled = true;
  stop.disabled = false;

  const chunks = [];
  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: 'audio/webm'
  });

  mediaRecorder.addEventListener('dataavailable', e => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  });

  mediaRecorder.addEventListener('stop', ()　=> {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(chunks));
    a.download = 'test.webm';
    a.click();
  });

  mediaRecorder.start();
});

stop.addEventListener('click', () => {
  if (mediaRecorder === null) {
    return;
  }

  start.disabled = false;
  stop.disabled = true;

  mediaRecorder.stop();
  mediaRecorder = null;
});

navigator.mediaDevices.getUserMedia({ 
  audio: true,
  video: false
}).then(stream => {
  mediaStream = stream;

  // ...
}).catch(error => {
  console.log(error);
});
```

音声フォーマットに `audio/webm` を指定しているが、対応状況的に最も安心なコーデックは最近だと一体何なんでしょう。

## デモ

<iframe loading="lazy" scrolling="no" title="Webで音声を描画・録音したい" src="https://codepen.io/1000ch/embed/OgbwEe?theme-id=light&default-tab=html,result" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/1000ch/pen/OgbwEe'>Webで音声を描画・録音したい</a> by 1000ch
  (<a href='https://codepen.io/1000ch'>@1000ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
