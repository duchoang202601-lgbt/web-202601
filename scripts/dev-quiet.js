const { spawn } = require('child_process');

const next = spawn('npx', ['next', 'dev'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

// Các pattern cần lọc bỏ
const filterPatterns = [
  /^GET\s/,
  /^POST\s/,
  /^PUT\s/,
  /^DELETE\s/,
  /^PATCH\s/,
  /Compiled\s/,
  /^\s*$/
];

function shouldShow(line) {
  // Luôn hiển thị lỗi
  if (line.includes('error') || line.includes('Error') || line.includes('ERROR')) {
    return true;
  }
  // Luôn hiển thị thông báo khởi động
  if (line.includes('Ready') || line.includes('Starting') || line.includes('Local:')) {
    return true;
  }
  // Lọc bỏ các pattern không cần thiết
  for (const pattern of filterPatterns) {
    if (pattern.test(line)) {
      return false;
    }
  }
  return true;
}

next.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (shouldShow(line) && line.trim()) {
      console.log(line);
    }
  });
});

next.stderr.on('data', (data) => {
  // Luôn hiển thị stderr (errors)
  console.error(data.toString());
});

next.on('close', (code) => {
  process.exit(code);
});

