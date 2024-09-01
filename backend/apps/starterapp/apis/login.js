/**
 * The login API.
 *  
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
const userid = require(`${__dirname}/lib/userid.js`);

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug("Got login request for ID: " + jsonReq.id);

	let result = await userid.login(jsonReq.id);

	if (result.result) LOG.info(`User logged in: ${result.name}`); else LOG.error(`Bad login for id: ${jsonReq.id}`);

	return {result: result.result};
}

const validateRequest = jsonReq => (jsonReq && jsonReq.id);
