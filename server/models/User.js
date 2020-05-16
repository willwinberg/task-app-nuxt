const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const url = require('mongoose-type-url')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = mongoose.Schema(
    {
        // id: {
        //     type: Number,
        //     required: true,
        //     unique: true
        // },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        firstName: {
            type: String
            // required: true
        },
        lastName: {
            type: String
            // required: true
        },
        title: {
            type: String
        },
        bio: {
            type: String,
            maxlength: 256
        },
        theme: {
            type: String,
            enum: ['light', 'dark']
        },
        location: {
            type: String
        },
        board: [
            // add this now or worry about it later when we want to add more boards?
            {
                type: ObjectId,
                ref: 'Board'
            }
        ],
        tasks: [
            {
                type: ObjectId,
                ref: 'Task'
            }
        ],
        imgUrl: {
            type: String
        },
        resetNonce: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', function hashPassword(next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.hash(this.password, 10, (err, hashword) => {
        if (err) {
            return next(err)
        }
        this.password = hashword
        return next()
    })
})

UserSchema.methods.validify = function(passwordTry, next) {
    bcrypt.compare(passwordTry, this.password, function(err, isMatch) {
        if (err) return next(err)
        next(null, isMatch)
    })
}

module.exports =
    mongoose.models.User || mongoose.model('User', UserSchema, 'users')
