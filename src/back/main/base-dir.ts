import { findNearestBaseDir } from './util/helper'

export default findNearestBaseDir() ?? process.cwd()
