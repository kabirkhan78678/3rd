const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const artifactsDir = 'C:\\Users\\chetn\\.gemini\\antigravity-ide\\brain\\c8a81b86-62fe-4a28-8516-2f29e89b60e1';
const img1 = path.join(artifactsDir, 'hero_headroom_1_1788869950901.jpg');
const img2 = path.join(artifactsDir, 'hero_headroom_2_1788869974269.jpg');
const img3 = path.join(artifactsDir, 'hero_headroom_3_1788869994531.jpg');

const outDir = path.join(__dirname, '..', 'public', 'videos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'hero.mp4');

console.log('Generating video with generous headroom to prevent head cropping...');
console.log('Using images:', { img1, img2, img3 });

// Key: y='0' keeps the top 35% open ceiling locked at the top of the video!
// Any subtle zoom in/out only expands from the floor/bottom, NEVER cutting off heads!
// Offset calculations:
// 30 fps
// Clip 0: 3.5s (105 frames)
// Clip 1: 3.5s (105 frames)
// Clip 2: 3.5s (105 frames)
// Clip 3: 1.5s (45 frames) loop bridge to Clip 0
const filterComplex = [
  // Clip 0: Subtle zoom anchored to top (y=0)
  "[0:v]zoompan=z='min(zoom+0.0004,1.05)':d=105:x='iw/2-(iw/zoom/2)':y='0':s=1920x1080:fps=30[v0]",
  // Clip 1: Subtle zoom out anchored to top (y=0)
  "[1:v]zoompan=z='if(lte(zoom,1.0),1.05,max(1.001,zoom-0.0004))':d=105:x='iw/2-(iw/zoom/2)':y='0':s=1920x1080:fps=30[v1]",
  // Clip 2: Subtle gentle pan anchored to top (y=0)
  "[2:v]zoompan=z='min(zoom+0.0003,1.04)':d=105:x='iw/2-(iw/zoom/2)+(in*0.2)':y='0':s=1920x1080:fps=30[v2]",
  // Clip 3: Loop bridge to start of Clip 0
  "[0:v]zoompan=z='1.0':d=45:x='iw/2-(iw/zoom/2)':y='0':s=1920x1080:fps=30[v3]",
  // Crossfades
  "[v0][v1]xfade=transition=fade:duration=0.8:offset=2.7[v01]",
  "[v01][v2]xfade=transition=fade:duration=0.8:offset=5.4[v012]",
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

console.log('Running ffmpeg render...');
const proc = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error('FFmpeg error:', error);
    console.error(stderr);
    process.exit(1);
  }
  console.log('Video generated successfully with headroom!');
  const stats = fs.statSync(outFile);
  console.log(`Video size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  // Copy poster image
  const posterDest = path.join(__dirname, '..', 'public', 'images', 'hero.jpg');
  fs.copyFileSync(img1, posterDest);
  console.log('Poster image updated at:', posterDest);
});

proc.stderr.on('data', (d) => {
  const line = d.toString();
  if (line.includes('frame=')) {
    process.stdout.write(line.trim() + '\r');
  }
});
