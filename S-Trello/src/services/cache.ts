import { Keyv } from 'keyv';
import { createCache } from 'cache-manager';
import { Users } from '@/model/users.entity';

const key1 = 'key1';
const key2 = new Keyv();

export const cache = createCache({
    stores: [key2],
})
