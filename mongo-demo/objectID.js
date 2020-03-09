const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

let time_in_id = id.getTimestamp();
console.log(id);

let isValid = mongoose.Types.ObjectId.isValid('5e6671a3eb634c00501c2cbf');

console.log(isValid);