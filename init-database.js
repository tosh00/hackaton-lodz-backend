
db.createCollection('linkedApps');

db.linkedApps.insertMany(
    [
        {
            "name": "TreePlanter",
            "logo": "https://i.pinimg.com/originals/d0/04/28/d00428efa0bf27b9edd37eac32dfd2c1.png",
            "apiKey": "ZHVwYWR1cGEyMTM3Njk2OQ"
        }, 
        {
            "name": "Bicycle",
            "logo": "https://i.pinimg.com/originals/d0/04/28/d00428efa0bf27b9edd37eac32dfd2c1.png",
            "apiKey": "V2llbGthUCp6ZGFDSFdEUA"
        }, 
        {
            "name": "GreenUp",
            "logo": "https://i.pinimg.com/originals/d0/04/28/d00428efa0bf27b9edd37eac32dfd2c1.png",
            "apiKey": "T3BsdWxNbmllWnVsSUh1ag"
        }
    ]
);