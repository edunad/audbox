const fs = require('fs-extra');

fs.remove('./www',(err) => {
    if(err != null) throw new Error(err.message);
});