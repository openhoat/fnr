const headless =
  process.env.E2E_TEST_HEADLESS !== 'false' || process.env.CI === 'true'
    ? 'shell'
    : true

export { headless }
