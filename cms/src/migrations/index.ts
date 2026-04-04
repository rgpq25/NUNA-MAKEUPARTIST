import * as migration_20260402_175819 from './20260402_175819';
import * as migration_20260403_203341 from './20260403_203341';
import * as migration_20260404_203313 from './20260404_203313';
import * as migration_20260404_205857 from './20260404_205857';

export const migrations = [
  {
    up: migration_20260402_175819.up,
    down: migration_20260402_175819.down,
    name: '20260402_175819',
  },
  {
    up: migration_20260403_203341.up,
    down: migration_20260403_203341.down,
    name: '20260403_203341',
  },
  {
    up: migration_20260404_203313.up,
    down: migration_20260404_203313.down,
    name: '20260404_203313',
  },
  {
    up: migration_20260404_205857.up,
    down: migration_20260404_205857.down,
    name: '20260404_205857'
  },
];
