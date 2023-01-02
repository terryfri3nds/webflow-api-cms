var mongoose = require('mongoose');
var Event = require('./event');
//var User = require('./user');
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailer = require("../mailer/mailer");
var Token = require("./token");

var Schema = mongoose.Schema;

const saltRounds = 10;

const validateEmail = (email) => {
  const re = /[^@]+@[^\.]+\..+/g;
  return re.test(email);
};

var userSchema = new Schema({
  uid: {
    type: String,
    trim: true,
    required: [true, "The 'UID' field is required"],
    unique: true
  },
  registrationToken: {
    type: String,
    trim: true,
    required: false,
    default: ''
  },
  displayName: {
    type: String,
    trim: true,
    required: [false, "The 'Display Name' field is required"],
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  photoURL: {
    type: String,
    trim: true,
    required: [false, "The 'Photo URL' field is required"],
    default: ''
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: false,
    default: ''
  },
  metadata: {
    type: Schema.Types.Mixed,
    trim: true,
    required: false,
    select: false
  },
  providerData: {
    type: Schema.Types.Mixed,
    trim: true,
    required: false,
    select: false
  },
  verifiedSms: { type: Boolean, default: false },
  state: { type: String, enum: ['Initial', 'Suspend', 'Remove'], default: 'Initial' },
  role: { type: String, enum: ['User', 'Admin', 'SuperAdmin'], default: 'User' },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: Event }],
  usersHidden: [{ type: mongoose.Schema.Types.ObjectId, ref: mUser }],
  lang: {
    type: String,
    trim: true,
    required: false,
    default: 'EN'
  },
  password: {
    type: String,
    trim: true,
    required: false,
    select: false
  },
  passwordResetToken: {
    type: String,
    trim: true,
    required: false,
    select: false
  },
  passwordResetTokenExpires: {
    type: Date,
    trim: true,
    required: false,
    select: false
  },
  notificationSettings: {
    type: Schema.Types.Mixed,
    trim: true,
    required: false
  }
},
  {
    timestamps: true
  });

//plugin para la utilizacion de UNIQUE
userSchema.plugin(uniqueValidator, { message: "The user {PATH} exist" });

//se ejecuta antes de hacer el evento save
userSchema.pre("save", function (next) {
 
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

//compara la password para permitir el acceso
userSchema.methods.validPassword = function (password) {
console.log(password)
console.log(this.password)
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.resetPassword = function (cb) {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString("hex"),
  });

  console.log("resetPassword -> " + this.email);

  const email_destination = this.email;
  token.save(function (err) {
    if (err) return cb(err);

    const mailOptions = {
      //from: "automated@phototap.me",
      from: process.env.SENDGRID_SENDER_EMAIL,
      to: email_destination,
      subject: "Reset password instructions",
      html: `Hello ${email_destination}!<br> <br>
      Someone has requested a link to change your password. You can do this through the link below.<br><br>
      <a href='${process.env.HOST}/resetPassword/${token.token}'>Change Password</a><br><br>
      If you didn't request this, please ignore this email.<br><br>
      our password won't change until you access the link above and create a new one.<br><br>
      Thanks,`,
    };
    mailer.sendMail(mailOptions, function (err) {
      if (err) return cb(err);
      console.log(
        `Email sent to: ${email_destination}`
      );
    });
    cb(null);
  });
};

userSchema.methods.canRemoveAccess = function () {

  if (this.role == 'User')
    return false

  return true;
};


userSchema.methods.canCreateEvent = function () { 

  if (this.role == 'User')
    return false

  return true;
};

userSchema.methods.canCreatePhotographer = function () {

  if (this.role == 'User')
    return false

  return true;
};

userSchema.methods.isAdmin = function () {

  if (this.role == 'User')
    return false

  return true;
};

var mUser = mongoose.model('user', userSchema);

module.exports = mUser;