'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Post', async (faker) => {
  let gender = ['men', 'women'];
  let random_number = Math.floor(Math.random() * 100);
  let random_gender = gender[Math.floor(Math.random()*gender.length)];
  let avatarUrl = `https://randomuser.me/api/portraits/${random_gender}/${random_number}.jpg`
  return {
    title: faker.sentence({ words: 2 }),
    description: faker.sentence({ words: 5 }),
    image_url: avatarUrl
  }
})