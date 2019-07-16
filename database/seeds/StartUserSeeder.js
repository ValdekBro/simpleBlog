'use strict'

/*
|--------------------------------------------------------------------------
| StartUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Env = use('Env')
const Database = use('Database');
const Hash = use('Hash');

class StartUserSeeder {
  async run () {
    await Database
      .table('users')
      .insert({ 
        username: 'admin',
        email: Env.get('ADMIN_USER_EMAIL'),
        password: await Hash.make(Env.get('ADMIN_USER_PASSWORD', 'root'))
      });
      
    await Factory
      .model('App/Models/User')
      .createMany(2);

    const user = await Factory.model('App/Models/User').create();
    const post = await Factory.model('App/Models/Post').make();
    await user.posts().save(post);
    
    Database.close();
    // process.exit(0);
  }
}

module.exports = StartUserSeeder
