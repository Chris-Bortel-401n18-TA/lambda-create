'use strict'

const uuid = require('uuid').v4;
const peopleModel = require('./schema.js');

// AWS lambda functions export a handler that is an async function that takes in an event
exports.handler = async (event) => {
  console.log(event);

  try {
    // NOTE: if you cannot parse the thing that is being recieved, we will recieve an error of cannot parse O of undefined so we do a try catch
    const body = JSON.parse(event.body);
    const { name, occupation } = body;
    const id = uuid();

    const record = new peopleModel({ id, name, occupation });
    const data = await record.save();
    const savedRecord = JSON.stringify(data);
    
    return {
      statusCode: 201,
      body: savedRecord,
    };

  } catch(e) {
    return {
      statusCode: 500,
      body: e.message,
    }

  }
    
}