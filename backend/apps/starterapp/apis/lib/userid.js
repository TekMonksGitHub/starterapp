/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3");
const API_CONSTANTS = require(`${__dirname}/constants.js`);
let usersDB;

exports.getUserHash = data => {
	return new Promise((resolve, reject) => bcrypt.hash(data, API_CONSTANTS.SALT_PW, (err, hash) => {
		if (err) reject("BCRYPT internal error."); else {
			// URL encoding removes characters which are illegal for paths, like "\" or "/" etc.
			let encoded_hash = encodeURIComponent(hash);

			// On Windows directory names can't end with the . character. So replace it with %2E
			// which is its URL encoded notation, if that's the case.
			if (encoded_hash.substr(-1) == '.')
				encoded_hash = encoded_hash.substring(0, encoded_hash.length - 1) + '%2E';
			
			resolve(encoded_hash);		
		}
	}));
}

exports.register = async (id, name) => {
	try {
		let exists = await exports.exists(name);
		if (!exists.result) {
			id = await exports.getUserHash(id);
			return new Promise( (resolve, _) => 
				usersDB.run(`INSERT INTO users(name, id) VALUES (?,?)`, [name,id], err => resolve(err?false:true)) );
		} else return false;
	} catch (err) {Promise.resolve(false);}
}

exports.login = id => {
	return new Promise((resolve, _) => {
		initDB()
		.then(_ => exports.getUserHash(id))
		.then(id => usersDB.all(`SELECT name, id FROM users WHERE id = '${id}' COLLATE NOCASE;`, (err, rows) => {
			if (err || !rows.length) resolve({result: false});
			else resolve({result: true, name: rows[0].name});
		}))
		.catch(_ => resolve({result: false}));
	});
}

exports.exists = name => {
	return new Promise((resolve, _) => {
		initDB()
		.then(_ => usersDB.all(`SELECT name FROM users WHERE name = '${name}' COLLATE NOCASE;`, (err, rows) => {
			if (err || !rows.length) resolve({result: false});
			else resolve({result: true, name: rows[0].name});
		}))
		.catch(_ => resolve({result: false}));
	});
}

function initDB() {
	return new Promise((resolve, reject) => {
		if (!usersDB) usersDB = new sqlite3.Database(API_CONSTANTS.APP_DB, sqlite3.OPEN_READWRITE, err => {
			if (!err) resolve(); else reject(err);
		}); else resolve();
	});
}