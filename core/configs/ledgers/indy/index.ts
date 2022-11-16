import {IndyPoolConfig} from '@aries-framework/core'

import BCovrinTest from './bcovrin-test/pool-config'
import CandyDev from './candy-dev/pool-config'
import CandyProd from './candy-prod/pool-config'
import CandyTest from './candy-test/pool-config'
import IndicioDemoNet from './indicio-demo-net/pool-config'
import IndicioMainNet from './indicio-main-net/pool-config'
import IndicioTestNet from './indicio-test-net/pool-config'
import SovrinBuilderNet from './sovrin-builder-net/pool-config'
import SovrinMainNet from './sovrin-main-net/pool-config'
import SovrinStagingNet from './sovrin-staging-net/pool-config'
import MnnuTest from './mnnu-test/pool-config'

export default [
    SovrinMainNet,
    IndicioMainNet,
    SovrinStagingNet,
    IndicioDemoNet,
    IndicioTestNet,
    CandyDev,
    CandyTest,
    CandyProd,
    BCovrinTest,
    SovrinBuilderNet,
    MnnuTest,
] as IndyPoolConfig[]
