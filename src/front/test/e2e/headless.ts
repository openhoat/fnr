const headless =
  process.env.E2E_TEST_HEADLESS !== 'false' || process.env.CI === 'true'
    ? 'new'
    : false

export { headless }
