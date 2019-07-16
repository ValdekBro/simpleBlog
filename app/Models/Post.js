'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static boot() {
        super.boot();
        this.addHook('afterCreate', 'PostHook.newPostNotification');
    }
        
    user () {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Post
