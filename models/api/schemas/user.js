module.exports = {
    id: '/User',
    type: 'object',
    properties: {
        uid : { type:'string' },
        displayName : { type:'string' },
        email : { type:'string' },
        photoURL : { type:'string' },
        phoneNumber : { type:'string' },
        verifiedSms : { type:'string' },
        state : { type:'string' }
    },
    required : ['uid']
  };
  