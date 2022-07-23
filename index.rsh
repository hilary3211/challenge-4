'reach 0.1'
export const main = Reach.App(() => {
    const Hilary = Participant('Hilary', {
        start: Fun([], Null),
    })
    const users = API('users', {
        users_connect: Fun([], UInt),
    })
    init()
    Hilary.interact.start()
    Hilary.publish()
    const [counter] =
        parallelReduce([0])
            .invariant(balance() == 0)
            .while(counter < 5)
            .api(users.users_connect,
                (done) => {
                    done(counter);
                    return [counter + 1];
                })

    commit()
    exit()
})
