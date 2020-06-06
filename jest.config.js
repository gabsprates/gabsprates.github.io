module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./config/tests.setup.ts"],
};
