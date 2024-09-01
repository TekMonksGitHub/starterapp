/**
 * Simple test API 
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */


exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}

    if (jsonReq.op == "set") {
        await CLUSTER_MEMORY.set(jsonReq.key, jsonReq.value, true);
        return {value: CLUSTER_MEMORY.get(jsonReq.key), ...CONSTANTS.TRUE_RESULT};
    }

    if (jsonReq.op == "get") return {value: CLUSTER_MEMORY.get(jsonReq.key), ...CONSTANTS.TRUE_RESULT};
	
	return CONSTANTS.TRUE_RESULT;
}

const validateRequest = jsonReq => jsonReq != null;