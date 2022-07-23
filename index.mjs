import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);
const Hilaryacc = await stdlib.newTestAccount(startingBalance);
const Usersacc = await stdlib.newTestAccounts(7, startingBalance);
const Hilaryctc = Hilaryacc.contract(backend);
console.log('Welcome Hilary and Users')

const users_connect = async (num) => {
    try {
        const acc = Usersacc[num]
        const user_address = acc.getAddress()
        const ctc = acc.contract(backend, Hilaryctc.getInfo());
        const counts = await ctc.apis.users.users_connect();
        console.log(` Account ${counts}'s account : ${user_address} has connected`)
    } catch (error) {
        console.log('Connection closed')
    }

}

await Promise.all([
    Hilaryctc.p.Hilary({
        start: () => {
            console.log('Hilary has started account connection')
        }
    }),
    await users_connect(0),
    await users_connect(1),
    await users_connect(2),
    await users_connect(3),
    await users_connect(4),
    await users_connect(5),
    await users_connect(6),
    await users_connect(7),
    process.exit()
]);
