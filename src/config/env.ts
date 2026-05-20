import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["BASE_URL", "API_URL", "TEST_USERNAME", "TEST_PASSWORD"] as const;

type RequiredVar = (typeof requiredVars)[number];

function getEnv(name: RequiredVar): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: getEnv("BASE_URL"),
  apiUrl: getEnv("API_URL"),
  testUsername: getEnv("TEST_USERNAME"),
  testPassword: getEnv("TEST_PASSWORD"),
  headless: process.env.HEADLESS !== "false"
};
