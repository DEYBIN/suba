const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt-nodejs')
const securitySchema = new Schema(
	{
		document: { type: String, default: ''},
		fullName: { type: String, default: ''},
		name: { type: String, default: ''},
		firstLastName: { type: String, default: ''},
		secondLastName: { type: String, default: ''},
		password: { type: String, default: bcrypt.hashSync('NewUser5020', bcrypt.genSaltSync(10))},
		providerName: { type: String, default: '' }, //Nombre del usuario (facebook - twitter - google - ...)
		provider: { type: String, default: '' }, //cuenta del usuario (facebook - twitter - google - ...)
		provider_id: { type: String, default: '' }, //ID que nos proporciona (facebook -twitter - google - ..)
		photo: { type: String, default: '' }, // avatar o foto del usuario (facebook -twitter - google - ..)
		email: { type: String, default: '' }, // avatar o foto del usuario (facebook -twitter - google - ..)
		type: { type: Number, default: 1 },
		CreateFullDate: { type: Date, default: Date.now}
	},
	{
		timestamps: true
	}
);
securitySchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
securitySchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
module.exports = model("SecurityDriver", securitySchema);
