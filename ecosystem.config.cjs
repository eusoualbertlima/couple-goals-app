const fs = require("fs");
const path = require("path");

function loadEnvFile(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) {
    return env;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const index = line.indexOf("=");
    if (index <= 0) {
      continue;
    }

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  return env;
}

const apiEnv = loadEnvFile(path.join(__dirname, "apps", "api", ".env"));

module.exports = {
  apps: [
    {
      name: "couple-api",
      cwd: __dirname,
      script: "apps/api/dist/main.js",
      env: {
        NODE_ENV: "production",
        ...apiEnv
      }
    },
    {
      name: "couple-web",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start apps/web -p 3100",
      env: {
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1"
      }
    }
  ]
};
