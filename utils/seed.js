const connection = require('../config/connection')
const { User, Thought, Reaction } = require('../models')

connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({})

    await Thought.deleteMany({})

    await Reaction.deleteMany({})

    const users = []

    console.table(users)
    console.info('Seeding completed.')
    process.exit(0)
})