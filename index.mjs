import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);
const [one, two, three, four, five] =
    await stdlib.newTestAccounts(5, startingBalance);
const ctcAlice = accAlice.contract(backend);

const users = []
/*const startbobs = async () => {
    const newbob = async (who) => {
        const acc = await stdlib.newTestAccount(startingBalance);
        const ctc = acc.contract(backend, ctcAlice.getInfo())
        users.push(acc.getAddress())
    }
    await newbob('bob')
    await newbob('bob2')

    console.log(users)
}*/
const newacc = async (whoi) => {
    try {
        const ctc = whoi.contract(backend, ctcAlice.getInfo());
        const checks = await ctc.apis.Bobs.newacc();
        //users.push(whoi.getAddress())
        console.log(`${whoi} has successfully connected`);
    } catch (error) {
        console.log(error);
    }
};
/*await Promise.all([
    await ctcAlice.p.Alice({
        ready: () => {
            console.log('Alice is ready')
        },
    }),
    await newacc(one),
    await newacc(two),
    await newacc(three),
    await newacc(four),
    await newacc(five),

])*/

await ctcAlice.p.Alice({
    ready: () => {
        console.log('Alice is ready')
    },
    /*await newacc(one)
    await newacc(two)
    await newacc(three)
    await newacc(four)
    await newacc(five)*/
})

await newacc(one)
await newacc(two)
await newacc(three)
await newacc(four)
await newacc(five)
console.log('Good bye guys')
