const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

// Cleanup test.mp4 if exists
if (fs.existsSync('test.mp4')) {
  fs.unlinkSync('test.mp4');
}

const artifactsDir = 'C:\\Users\\chetn\\.gemini\\antigravity-ide\\brain\\c8a81b86-62fe-4a28-8516-2f29e89b60e1';
const img1 = path.join(artifactsDir, 'hero_light_1_1788869025615.jpg');
const img2 = path.join(artifactsDir, 'hero_light_2_1788869049355.jpg');
const img3 = path.join(artifactsDir, 'hero_light_3_1788869076157.jpg');

const outDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'hero.mp4');

console.log('Generating video from light studio shots...');
console.log('Output file:', outFile);

// zoompan settings (30fps)
// Clip 0: 3.5s (105 frames), slow subtle zoom in
// Clip 1: 3.5s (105 frames), slow subtle zoom out
// Clip 2: 3.5s (105 frames), slow subtle pan right
// Clip 3: 1.5s (45 frames), matching start of Clip 0 to create seamless loop
const filterComplex = [
  // Clip 0
  "[0:v]zoompan=z='min(zoom+0.0006,1.07)':d=105:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v0]",
  // Clip 1
  "[1:v]zoompan=z='if(lte(zoom,1.0),1.07,max(1.001,zoom-0.0006))':d=105:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v1]",
  // Clip 2
  "[2:v]zoompan=z='min(zoom+0.0005,1.06)':d=105:x='iw/2-(iw/zoom/2)+(in*0.3)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v2]",
  // Clip 3 (Loop bridge to img1)
  "[0:v]zoompan=z='1.0':d=45:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30[v3]",
  // Crossfade v0 and v1 at offset 2.7s
  "[v0][v1]xfade=transition=fade:duration=0.8:offset=2.7[v01]",
  // Crossfade v01 and v2 at offset 5.4s
  "[v01][v2]xfade=transition=fade:duration=0.8:offset=5.4[v012]",
  // Crossfade v012 and v3 at offset 8.1s
  "[v012][v3]xfade=transition=fade:duration=0.8:offset=8.1,format=yuv420p[vout]"
].join(';');

const args = [
  '-y',
  '-i', img1,
  '-i', img2,
  '-i', img3,
  '-filter_complex', filterComplex,
  '-map', '[vout]',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '19',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  outFile
];

console.log('Running ffmpeg...');
const proc = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error('FFmpeg error:', error);
    console.error(stderr);
    process.exit(1);
  }
  console.log('Video generated successfully!');
  const stats = fs.statSync(outFile);
  console.log(`Video size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  // Copy img1 or img3 as poster image
  const posterDest = path.join(__dirname, '..', 'public', 'images', 'hero.jpg');
  fs.copyFileSync(img1, posterDest);
  console.log('Poster image copied to:', posterDest);
});

proc.stderr.on('data', (d) => {
  const line = d.toString();
  if (line.includes('frame=')) {
    process.stdout.write(line.trim() + '\r');
  }
});
