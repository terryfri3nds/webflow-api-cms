const Webflow = require("webflow-api");
const fetch = require('node-fetch');

// initialize the client with the access token
const webflow = new Webflow({ token: "9d4ce597fb3e0731152297a55636053efddb07cf7655c76772268fbcb58a0636" });


function search(item){

  
         return Object.keys(this).every((key) => {
            var band = false;

            //Is Array
            if (Array.isArray(item[key]))
            { 
                for (const element of item[key])
                { 
                    for (const thisItem of this[key])
                    {
                        band = (element == thisItem);
                        if (band)
                         break;
                    }
                 }
                
                 return band;

            }

            //Not equal
            if(key[0] === "-") 
            {
                const prop = key.substring(1);
              
                if (Array.isArray(this[key]))
                { 
                   
                    for (const element of this[key])
                    { 
                        band = (element == item[prop]);
                        if (band)
                           break;  
                    }
                    
                    return !band;
                }

                return item[prop] !== this[key];
            }

            return item[key] === this[key];
        });
    

   // return Object.keys(this).every((key) => item[key] === this[key]);
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple(props) {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    //var props = arguments;
   
    return function (obj1, obj2) { 
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
    
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
       
        return result;
    }
}

async function getAllPeoples() {
   
    const collection = await webflow.collection({ collectionId: "637d45fe861d648fd24f7e2d" });

    data = await collection.items();
   
    return data;

}
 

getAllItems = async function (collectionId, query, limit, offset, sort) {
    // get the first site
    //const [site] = await webflow.sites();

    //Get coaches
    const peoples = await getAllPeoples();
    // Get a single collection
    const collection = await webflow.collection({ collectionId: collectionId });


    let _offset = offset != undefined? offset : 0;
    let _limit = limit != undefined? limit : 100;
    let data = []
    let items = []

    if (limit != undefined || offset != undefined)
    {
      
        data = await collection.items({ limit: _limit, offset: _offset });
    }
    else
    {
        while (true) {
        
            items = await collection.items({ limit: _limit, offset: _offset });
    
            if (items.length <= 0)
                break;

            // data.results contains an array of objects where each object is a movie
            items.forEach((item) => {
                data.push(item);
            });
            _offset += items.length;
            items = []
        }
    }

    if (query && query != undefined)
    {
        // Filter collection
        data = data.filter(search, query);
    }

    if (sort && sort != undefined)
    {
        // Filter collection
        data = data.sort(dynamicSortMultiple(sort));
    }
 
    var result = data;

    //Map instructor && author
    if (
        data.length > 0 
        && ("instructor" in data[0] || "choose-director-video-producer-podcast-or-author-blog-for-the-item" in data[0])
        && peoples
    )
    {
        result = data.map((item) => {
            var newItem = item;
           
            newItem.instructor = peoples.find(e => e._id == item.instructor);
            newItem["choose-director-video-producer-podcast-or-author-blog-for-the-item"] = peoples.find(e => e._id == item["choose-director-video-producer-podcast-or-author-blog-for-the-item"]);

            return newItem;
        });
     
    }

    return result;

}

module.exports = { getAllItems };
